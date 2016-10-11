namespace SQLSaturday
{
    using System.Collections.Generic;
    using Microsoft.EntityFrameworkCore;

    public class SQLSaturdayContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=SQLSaturday;User ID=sa;Password=hell0w0rld;");
        }
    }
}