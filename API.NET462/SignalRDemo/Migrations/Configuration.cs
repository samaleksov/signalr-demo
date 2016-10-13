namespace SignalRDemo.Migrations
{
    using Data;
    using Domain;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Data.SqlClient;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SignalRDemo.Data.SignalRDemoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SignalRDemoContext context)
        {
            using (var conn = new SqlConnection(context.Database.Connection.ConnectionString))
            {
                conn.Open();
                var command = conn.CreateCommand();
                command.CommandText = "ALTER DATABASE [" + context.Database.Connection.Database + "] SET ENABLE_BROKER WITH ROLLBACK IMMEDIATE";
                command.ExecuteNonQuery();
            }

            context.Counters.AddOrUpdate(x => x.CounterId,
                new Counter() { CounterId = "175c0449", Name = "Let's count together", Value = 0 }
                );
            context.Stocks.AddOrUpdate(x => x.Symbol,
                new Stock() { Symbol = "AAPL", Company = "Apple Inc.", LastUpdated = DateTime.Now, Price = 99.33, OldPrice = 99.33 },
                new Stock() { Symbol = "EPAM", Company = "EPAM Systems Inc", LastUpdated = DateTime.Now, Price = 110.33, OldPrice = 110.33 },
                new Stock() { Symbol = "GOOGL", Company = "Alphabet Inc", LastUpdated = DateTime.Now, Price = 832.71, OldPrice = 832.71 },
                new Stock() { Symbol = "MSFT", Company = "Microsoft Corporation", LastUpdated = DateTime.Now, Price = 71.96, OldPrice = 71.96 }
                );
        }
    }
}
