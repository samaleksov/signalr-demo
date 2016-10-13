using SignalRDemo.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SignalRDemo.Tickers
{
    public class StockTicker
    {
        public static Lazy<StockTicker> Instance = new Lazy<StockTicker>(() => new StockTicker());

        private Timer timer;
        private SignalRDemoContext context;
        private Random random;
        private StockTicker()
        {
            this.context = new SignalRDemoContext();
            this.random = new Random();
            this.timer = new Timer(this.Tick, null, 0, Timeout.Infinite);
        }

        private void Tick(object state)
        {
            var tickers = this.context.Stocks.ToList();
            var ticker = tickers.ElementAt(random.Next(0, tickers.Count));
            ticker.OldPrice = ticker.Price;
            ticker.Price += random.NextDouble() * random.Next(-1, 2);
            ticker.LastUpdated = DateTime.Now;
            this.context.SaveChanges();
            this.timer = new Timer(this.Tick, null, 500, Timeout.Infinite);
        }


    }
}
