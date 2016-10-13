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
    
    public class StockTickersController : ApiController
    {
        private readonly SignalRDemoContext dbContext;
        private readonly IMapper mapper;
        public StockTickersController(SignalRDemoContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }
        
        public IEnumerable<StockModel> Get()
        {
            return this.mapper.Map<IEnumerable<StockModel>>(this.dbContext.Stocks.ToList());
        }
    }
}
