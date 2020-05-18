using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Busiess.Models.Db
{
    public class Tracker
    {
        [Key]
        public Guid TrackerId { get; set; }
        public string TrackerName { get; set; }
        public int TrackerTotalTime { get; set; }
        public bool IsActiveTracker { get; set; }
        public User User { get; set; }
        public ICollection<UserTracking> UserTrackings { get; set; }
    }
}
