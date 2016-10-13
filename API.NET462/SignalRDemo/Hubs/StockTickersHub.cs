namespace SignalRDemo.Hubs
{
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    [HubName("stock")]
    public class StockTickersHub : Hub
    {
        public StockTickersHub()
        {
        }
        
        public void JoinGroup(string groupName)
        {
            Groups.Add(Context.ConnectionId, groupName);
            Clients.Caller.groupAdded();
        }
    }
}