namespace SignalRDemo.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class StockModel
    {
        public string Symbol { get; set; }
        public string Company { get;set; }

        public double OldPrice { get; set; }
        public double Price { get;set; }
        public DateTime LastUpdated { get; set; }
    }
}