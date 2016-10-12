namespace SignalRDemo.Controllers
{
    using System.Collections.Generic;
    using AutoMapper;
    using System.Linq;
    using System;
    using System.Web.Http;
    using Microsoft.AspNet.SignalR;
    using Data;
    using Hubs;
    using Models;
    using Domain;
    
    public class CountersController : ApiController
    {
        private readonly SignalRDemoContext dbContext;
        private readonly IMapper mapper;
        private readonly IHubContext hubContext;
        public CountersController(SignalRDemoContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.hubContext =  GlobalHost.ConnectionManager.GetHubContext<CountersHub>();
        }
        
        public IEnumerable<CounterModel> Get()
        {
            return this.mapper.Map<IEnumerable<CounterModel>>(this.dbContext.Counters.ToList());
        }
        
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
        
        public void Put(string id, [FromBody]CounterModel counter)
        {
            Counter existingCounter = this.dbContext.Counters.FirstOrDefault(x => x.CounterId == id);
            this.mapper.Map(counter, existingCounter);
            this.dbContext.SaveChanges();
            this.hubContext.Clients.Group(counter.CounterId).updateCounter(counter);
        }
        
        public void Delete(string id)
        {
            Counter existingCounter = this.dbContext.Counters.FirstOrDefault(x => x.CounterId == id);
            this.dbContext.Counters.Remove(existingCounter);
            this.dbContext.SaveChanges();
        }
    }
}
