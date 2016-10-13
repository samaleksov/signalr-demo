using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;

[assembly: OwinStartup(typeof(SignalRDemo.Startup))]

namespace SignalRDemo
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalHost.DependencyResolver.UseSqlServer(WebApiApplication.ConnectionString);

            app.Map("/signalr", map =>
            {
                map.UseCors(CorsOptions.AllowAll);
                var hubConfiguration = new HubConfiguration
                {
                };
                map.RunSignalR(hubConfiguration);
            });
        }
    }
}
