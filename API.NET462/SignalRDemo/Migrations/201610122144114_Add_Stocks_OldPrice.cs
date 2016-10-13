namespace SignalRDemo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_Stocks_OldPrice : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Stocks", "OldPrice", c => c.Double(nullable: false));
            DropColumn("dbo.Stocks", "Up");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Stocks", "Up", c => c.Boolean(nullable: false));
            DropColumn("dbo.Stocks", "OldPrice");
        }
    }
}
