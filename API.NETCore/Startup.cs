namespace SignalRDemo
{
    using AutoMapper;
    using MappingProfiles;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Logging;

    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR(options =>
            {
                options.Hubs.EnableDetailedErrors = true;
            });

            services.AddMvc()
                    .AddJsonOptions(options =>
                    {
                        options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
                    });

            Mapper.Initialize(cfg => cfg.AddProfile<DomainProfile>());

            services.AddScoped<IMapper>(sp => new Mapper(Mapper.Configuration));

            services.AddDbContext<SignalRDemoContext>();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            
            app.UseCors((policyBuilder) => 
            {
                policyBuilder
                    .WithOrigins("http://localhost:3333")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
            
            app.UseFileServer();
            app.UseWebSockets();
            app.UseMvc();
            app.UseSignalR();
        }
    }
}