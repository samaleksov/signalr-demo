namespace SignalRDemo.Controllers
{
    using System.Collections.Generic;
    using AutoMapper;
    using System.Linq;
    using System;
    using System.Web.Http;
    using Data;
    using Models;
    using Domain;

    public class UsersController : ApiController
    {
        private readonly SignalRDemoContext dbContext;
        private readonly IMapper mapper;
        public UsersController(SignalRDemoContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }
        
        public IEnumerable<UserModel> Get()
        {
            return this.mapper.Map<IEnumerable<UserModel>>(this.dbContext.Users.ToList());
        }
        
        public UserModel Get(string id)
        {
            return this.mapper.Map<UserModel>(this.dbContext.Users.FirstOrDefault(x => x.UserId == id));
        }
        
        public void Post([FromBody]UserModel user)
        {
            user.UserId = Guid.NewGuid().ToString();
            this.dbContext.Users.Add(this.mapper.Map<User>(user));
            this.dbContext.SaveChanges();
        }
        
        public void Put(string id, [FromBody]UserModel user)
        {
            User existingUser = this.dbContext.Users.FirstOrDefault(x => x.UserId == id);
            this.mapper.Map(user, existingUser);
            this.dbContext.SaveChanges();
        }
        
        public void Delete(string id)
        {
            User existingUser = this.dbContext.Users.FirstOrDefault(x => x.UserId == id);
            this.dbContext.Users.Remove(existingUser);
            this.dbContext.SaveChanges();
        }
    }
}
