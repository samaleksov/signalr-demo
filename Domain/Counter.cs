namespace SignalRDemo
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class Counter
    {
        [Key]
        public string CounterId { get; set; }
        public string Name { get; set; }
        public long Value { get;set; }
    }
}