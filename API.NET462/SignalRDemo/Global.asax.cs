using AutoMapper;
using Microsoft.AspNet.SignalR;
using SignalRDemo.Data;
using SignalRDemo.Hubs;
using SignalRDemo.Models;
using SignalRDemo.Tickers;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace SignalRDemo
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        public static string ConnectionString = @"Server=localhost;Database=SignalRDemo;User ID=sa;Password=hell0w0rld;";

        private DateTime lastUpdate;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            var st = StockTicker.Instance.Value;
            var pt = DashTicker.Instance.Value;
            this.RegisterStockTickersSQLDependency();
        }

        private void RegisterStockTickersSQLDependency()
        {
            string commandText = @"SELECT dbo.Stocks.Symbol, dbo.Stocks.Price, dbo.Stocks.OldPrice FROM dbo.Stocks";
            SqlDependency.Start(ConnectionString);
            using (SqlConnection connection = new SqlConnection(ConnectionString))
            {
                using (SqlCommand command = new SqlCommand(commandText, connection))
                {
                    connection.Open();
                    var sqlDependency = new SqlDependency(command);
                    sqlDependency.OnChange += new OnChangeEventHandler(this.StockTicker_OnChange);
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                    }
                }
            }
        }

        private void StockTicker_OnChange(object sender, SqlNotificationEventArgs e)
        {
            if (e.Info == SqlNotificationInfo.Update)
            {
                
                var hubContext = GlobalHost.ConnectionManager.GetHubContext<StockTickersHub>();
                using (var context = new SignalRDemoContext())
                {
                    var updatedTickers = context.Stocks.Where((stock) => stock.LastUpdated > lastUpdate).ToList();
                    var clientData = Mapper.Instance.Map<IEnumerable<StockModel>>(updatedTickers);
                    hubContext.Clients.All.updateTickers(clientData);
                }
                this.lastUpdate = DateTime.Now;
            }
            RegisterStockTickersSQLDependency();
        }
    }
}
