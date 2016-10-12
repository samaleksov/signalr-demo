namespace SignalRDemo.Controllers
{
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Mvc;
    using AutoMapper;
    using System.Linq;
    using System;
    using Microsoft.AspNetCore.SignalR;
    using SignalR;

    [Route("api/[controller]")]
    public class CountersController : Controller
    {
        private readonly SignalRDemoContext dbContext;
        private readonly IMapper mapper;
        private readonly IHubContext hubContext;
        public CountersController(SignalRDemoContext dbContext, IMapper mapper, IHubContext<CountersHub> hubContext)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.hubContext = hubContext;
        }

        [HttpGet]
        public IEnumerable<CounterModel> Get()
        {
            return this.mapper.Map<IEnumerable<CounterModel>>(this.dbContext.Counters.ToList());
        }

        [HttpGet("{id}")]
        public CounterModel Get(string id)
        {
            return this.mapper.Map<CounterModel>(this.dbContext.Counters.FirstOrDefault(x => x.CounterId == id));
        }

        [HttpPost]
        public void Post([FromBody]CounterModel counter)
        {
            counter.CounterId = Guid.NewGuid().ToString();
            this.dbContext.Counters.Add(this.mapper.Map<Counter>(counter));
            this.dbContext.SaveChanges();
        }

        [HttpPut("{id}")]
        public void Put(string id, [FromBody]CounterModel counter)
        {
            Counter existingCounter = this.dbContext.Counters.FirstOrDefault(x => x.CounterId == id);
            this.mapper.Map(counter, existingCounter);
            this.dbContext.Update(existingCounter);
            this.dbContext.SaveChanges();
            this.hubContext.Clients.Group(counter.CounterId).updateCouter(counter);
        }
        
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            Counter existingCounter = this.dbContext.Counters.FirstOrDefault(x => x.CounterId == id);
            this.dbContext.Remove(existingCounter);
            this.dbContext.SaveChanges();
        }
    }
}
