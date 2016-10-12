using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SignalRDemo;

namespace NETCoreDemo.Migrations
{
    [DbContext(typeof(SignalRDemoContext))]
    [Migration("20161011144252_add_counters")]
    partial class add_counters
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SignalRDemo.Counter", b =>
                {
                    b.Property<string>("CounterId");

                    b.Property<string>("Name");

                    b.Property<long>("Value");

                    b.HasKey("CounterId");

                    b.ToTable("Counters");
                });

            modelBuilder.Entity("SignalRDemo.User", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("Email");

                    b.Property<string>("Username");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });
        }
    }
}
