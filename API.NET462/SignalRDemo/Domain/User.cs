namespace SignalRDemo.Domain
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class User
    {
        [Key]
        public string UserId { get; set; }
        public string Username { get;set; }
        public string Email { get;set; }
    }
}