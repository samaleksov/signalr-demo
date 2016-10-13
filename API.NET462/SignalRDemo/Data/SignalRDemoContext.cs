namespace SignalRDemo.Data
{
    using Domain;
    using System.Collections.Generic;
    using System.Data.Entity;

    public class SignalRDemoContext : DbContext
    {
        public SignalRDemoContext() 
            : base(WebApiApplication.ConnectionString)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Counter> Counters { get; set; }
        public DbSet<Stock> Stocks { get; set; }
    }
}