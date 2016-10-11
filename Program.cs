namespace SQLSaturday
{
    using System.Data.SqlClient;
    using System.IO;
    using System.Linq;
    using Microsoft.AspNetCore.Hosting;

    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .Build();

            
            var dbContext = new SQLSaturdayContext();
            
            var allUsers = dbContext.Users.ToList();
            host.Run();
        }
    }
}
