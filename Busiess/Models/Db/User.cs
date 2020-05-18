using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Busiess.Models.Db
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public ICollection<UserTracking> UserTrackings { get; set; }
        public ICollection<Tracker> Trackers { get; set; }
    }
}
