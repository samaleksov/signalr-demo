namespace SignalRDemo.Hubs
{
    using System;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;
    using Microsoft.AspNetCore.SignalR.Hubs;
    using System.Linq;
    using Microsoft.EntityFrameworkCore;

    [HubName("counters")]
    public class CountersHub : Hub
    {
        private static readonly TaskCompletionSource<object> _neverEndingTcs = new TaskCompletionSource<object>();
        
        public CountersHub()
        {
        }
        
        public void JoinGroup(string groupName)
        {
            Groups.Add(Context.ConnectionId, groupName);
            Clients.Caller.groupAdded();
        }
    }
}