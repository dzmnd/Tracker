using Busiess.Models.DataObject;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Busiess.Interfaces
{
    public interface ITrackerService
    {
        Task<object> AddTracker(TrackerDataObject trackerDataObject);
        Task<List<TrackerDataObject>> GetTrackers(string userName);
        Task<object> DeleteTracker(Guid trackerId);
        Task StartTracker(Guid trackerId, string userName);
        Task StopTracker(Guid trackerId);
    }
}
