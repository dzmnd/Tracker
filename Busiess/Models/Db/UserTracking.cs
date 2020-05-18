using System;
using System.ComponentModel.DataAnnotations;

namespace Busiess.Models.Db
{
    public class UserTracking
    {
        [Key]
        public Guid UserTrackingId { get; set; }
        public DateTime? TrackerStartTime { get; set; }
        public DateTime? TrackerStopTime { get; set; }
        public int OverTime { get; set; }
        public User User { get; set; }
        public Tracker Tracker { get; set; }
    }
}
