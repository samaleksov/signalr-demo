using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Diagnostics;
using Microsoft.AspNet.SignalR;
using SignalRDemo.Hubs;

namespace SignalRDemo.Tickers
{
    public class DashTicker
    {
        public static Lazy<DashTicker> Instance = new Lazy<DashTicker>(() => new DashTicker());

        private PerformanceCounter theCPUCounter = new PerformanceCounter("Processor", "% Processor Time", "_Total");
        private PerformanceCounter theCPU1Counter = new PerformanceCounter("Processor", "% Processor Time", "0");
        private PerformanceCounter theCPU2Counter = new PerformanceCounter("Processor", "% Processor Time", "1");
        private PerformanceCounter theMemCounter = new PerformanceCounter("Memory", "Available MBytes");
        private PerformanceCounter appCPUCounter = new PerformanceCounter("Process", "% Processor Time", Process.GetCurrentProcess().ProcessName);
        private PerformanceCounter appMemCounter = new PerformanceCounter("Process", "Working Set", Process.GetCurrentProcess().ProcessName);

        private Timer timer;
        private DashTicker()
        {
            this.timer = new Timer(this.Tick, null, 0, Timeout.Infinite);
        }

        private void Tick(object state)
        {
            var theCPUCounterValue = this.theCPUCounter.NextValue();
            var theCPU1CounterValue = this.theCPU1Counter.NextValue();
            var theCPU2CounterValue = this.theCPU2Counter.NextValue();
            var theAvailableMemCounterValue = this.theMemCounter.NextValue();
            var appCPUCounterValue = this.appCPUCounter.NextValue();
            var appMemCounterValue = this.appMemCounter.NextValue() / 1048576;
            var totalMemory = new Microsoft.VisualBasic.Devices.ComputerInfo().TotalPhysicalMemory / 1048576;
            GlobalHost.ConnectionManager.GetHubContext<DashboardHub>().Clients.All.addStats(new {
                timestamp = DateTime.Now,
                cpu = theCPUCounterValue,
                cpu1 = theCPU1CounterValue,
                cpu2 = theCPU2CounterValue,
                availableMem = theAvailableMemCounterValue,
                appMem = appMemCounterValue,
                appCpu = appCPUCounterValue,
                mem = totalMemory
            });

            this.timer = new Timer(this.Tick, null, 1000, Timeout.Infinite);
        }
    }
    
}
