using System;

namespace Busiess.Models.DataObject
{
    public class TrackerDataObject
    {
        public Guid TrackerId { get; set; }
        public string UserName { get; set; }
        public string TrackerName { get; set; }
        public int TrackerTotalTime { get; set; }
        public int OverTime { get; set; }
        public bool IsActiveTracker { get; set; }
        public DateTime? TrackerStartTime { get; set; }
    }
}
