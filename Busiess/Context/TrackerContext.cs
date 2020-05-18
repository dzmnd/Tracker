using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Busiess.Models.Db;
using Microsoft.EntityFrameworkCore;

namespace Busiess.Context
{
    public class TrackerContext : IdentityDbContext<User>
    {
        public TrackerContext(DbContextOptions<TrackerContext> options) : base(options) { }
        public DbSet<Email> EmailTemplates { get; set; }
        public DbSet<Tracker> Trackers { get; set; }
        public DbSet<UserTracking> UserTrackings { get; set; }
    }
}
