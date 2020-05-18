using Busiess.Context;
using Busiess.Interfaces;
using Busiess.Models.Db;
using Busiess.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace TrackerAuthApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSingleton<IConfiguration>(Configuration);
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<ITrackerService, TrackerService>();

            services.AddDbContext<TrackerContext>(options =>
                    options.UseSqlServer(Configuration["ConnectionString_TrackerDb"]));

            services.AddIdentity<User, IdentityRole>(options => {
                                                                    options.Password.RequiredLength = 6;
                                                                    options.Password.RequireNonAlphanumeric = false;
                                                                    options.Password.RequireLowercase = false;
                                                                    options.Password.RequireUppercase = false;
                                                                    options.Password.RequireDigit = false;
                                                                })
                    .AddEntityFrameworkStores<TrackerContext>()
                    .AddDefaultTokenProviders();

            services.AddCors(o => o.AddPolicy("CorsPolicy", builder => builder.WithOrigins(Configuration["WebClientUrl"])
                                                                              .AllowAnyMethod()
                                                                              .AllowAnyHeader()
                                                                              .AllowCredentials()
                                            )
                           );
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseCors("CorsPolicy");

            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
