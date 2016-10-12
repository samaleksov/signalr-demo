namespace SignalRDemo.Hubs
{
    using Microsoft.AspNet.SignalR;
    using System.Threading;
    using System.Threading.Tasks;

    public class TypedDemoHub : Hub<IClient>
    {
        private static int _invokeCount = 0;

        public async Task Echo(string message)
        {
            await Clients.Caller.Echo(message, Interlocked.Increment(ref _invokeCount));
        }
    }

    public interface IClient
    {
        Task Echo(string message, int invokeCount);
        void MethodB(int arg1, int arg2);
    }
}