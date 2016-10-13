namespace SignalRDemo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Stocks : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Counters",
                c => new
                    {
                        CounterId = c.String(nullable: false, maxLength: 128),
                        Name = c.String(),
                        Value = c.Long(nullable: false),
                    })
                .PrimaryKey(t => t.CounterId);
            
            CreateTable(
                "dbo.Stocks",
                c => new
                    {
                        Symbol = c.String(nullable: false, maxLength: 128),
                        Company = c.String(),
                        Price = c.Double(nullable: false),
                        LastUpdated = c.DateTime(nullable: false),
                        Up = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Symbol);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        Username = c.String(),
                        Email = c.String(),
                    })
                .PrimaryKey(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Users");
            DropTable("dbo.Stocks");
            DropTable("dbo.Counters");
        }
    }
}
