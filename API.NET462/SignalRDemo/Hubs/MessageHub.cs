namespace SignalRDemo.Hubs
{
    using Microsoft.AspNet.SignalR;
    using Microsoft.AspNet.SignalR.Hubs;
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    [HubName("message")]
    public class MessageHub : Hub
    {
        public MessageHub()
        {
        }

        public void SendMessage(string message)
        {
            this.Clients.Others.receiveMessage(message);
        }
    }
}