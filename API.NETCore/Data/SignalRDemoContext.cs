namespace SignalRDemo
{
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    public class SignalRDemoContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Counter> Counters { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=SignalRDemo;User ID=sa;Password=hell0w0rld;");
        }
    }
}