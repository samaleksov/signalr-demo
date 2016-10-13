namespace SignalRDemo.Hubs
{
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    [HubName("navigation")]
    public class NavigationHub : Hub
    {
        public NavigationHub()
        {
        }

        public void Navigate(object target)
        {
            this.Clients.Others.navigate(target);
        }
    }
}