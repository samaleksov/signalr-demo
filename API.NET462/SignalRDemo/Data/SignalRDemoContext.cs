namespace SignalRDemo.Data
{
    using Domain;
    using System.Collections.Generic;
    using System.Data.Entity;

    public class SignalRDemoContext : DbContext
    {
        public SignalRDemoContext() 
            : base(@"Server=localhost;Database=SignalRDemo;User ID=sa;Password=hell0w0rld;")
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Counter> Counters { get; set; }
    }
}