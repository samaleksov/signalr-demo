namespace SignalRDemo.Controllers
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using AutoMapper;
    using System.Linq;

    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly SignalRDemoContext dbContext;
        private readonly IMapper mapper;
        public UsersController(SignalRDemoContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<UserModel> Get()
        {
            return this.mapper.Map<IEnumerable<UserModel>>(this.dbContext.Users.ToList());
        }

        [HttpGet("{id}")]
        public UserModel Get(string id)
        {
            return this.mapper.Map<UserModel>(this.dbContext.Users.FirstOrDefault(x => x.UserId == id));
        }

        [HttpPost]
        public void Post([FromBody]UserModel user)
        {
            this.dbContext.Users.Add(this.mapper.Map<User>(user));
            this.dbContext.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(string id, [FromBody]UserModel user)
        {
            User existingUser = this.dbContext.Users.FirstOrDefault(x => x.UserId == id);
            this.mapper.Map(user, existingUser);
            this.dbContext.Update(existingUser);
            this.dbContext.SaveChanges();
        }
        
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            User existingUser = this.dbContext.Users.FirstOrDefault(x => x.UserId == id);
            this.dbContext.Remove(existingUser);
            this.dbContext.SaveChanges();
        }
    }
}
