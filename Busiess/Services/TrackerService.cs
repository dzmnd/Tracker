using Busiess.Context;
using Busiess.Interfaces;
using Busiess.Models.DataObject;
using Busiess.Models.Db;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Busiess.Services
{
    public class TrackerService : ITrackerService
    {
        private readonly TrackerContext _trackerContext;
        private readonly UserManager<User> _userManager;
        public TrackerService(TrackerContext trackerContext, UserManager<User> userManager)
        {
            _trackerContext = trackerContext;
            _userManager = userManager;
        }

        public async Task<object> AddTracker(TrackerDataObject trackerDataObject) 
        {
            _trackerContext.Trackers.Add(new Tracker {
                                                         TrackerId = Guid.NewGuid(),
                                                         IsActiveTracker = false,
                                                         TrackerName = trackerDataObject.TrackerName,
                                                         TrackerTotalTime = trackerDataObject.TrackerTotalTime,
                                                         User = await _userManager.FindByNameAsync(trackerDataObject.UserName)
                                                     });
            _trackerContext.SaveChanges();
            return new { IsSucceeded = true };
        }

        public async Task<List<TrackerDataObject>> GetTrackers(string userName) 
        {
            List<TrackerDataObject> trackerDataObjects =  _trackerContext.Trackers.Where(t => t.User.UserName == userName)
                                                                                  .Select(t => new TrackerDataObject {
                                                                                                                         IsActiveTracker = t.IsActiveTracker,
                                                                                                                         TrackerId = t.TrackerId,
                                                                                                                         TrackerName = t.TrackerName,
                                                                                                                         TrackerTotalTime = t.TrackerTotalTime,
                                                                                                                         TrackerStartTime = t.UserTrackings
                                                                                                                                             .First(ut => ut.TrackerStopTime == null)
                                                                                                                                             .TrackerStartTime
                                                                                  })
                                                                                  .ToList();
            return trackerDataObjects;
        }

        public async Task<object> DeleteTracker(Guid trackerId) 
        {
            Tracker trackerDb = _trackerContext.Trackers.FirstOrDefault(t => t.TrackerId == trackerId);
            UserTracking userTrackingDb = _trackerContext.UserTrackings.FirstOrDefault(ut => ut.Tracker == trackerDb);
            if (userTrackingDb != null)
            {
                _trackerContext.UserTrackings.Remove(userTrackingDb);
            }
            _trackerContext.Trackers.Remove(trackerDb);
            _trackerContext.SaveChanges();
            return true;
        }

        public async Task StartTracker(Guid trackerId, string userName)
        {
            Tracker trackerDb = _trackerContext.Trackers.FirstOrDefault(t => t.TrackerId == trackerId);
            trackerDb.IsActiveTracker = true;
            UserTracking userTracking = new UserTracking
            {
                UserTrackingId = Guid.NewGuid(),
                Tracker = trackerDb,
                TrackerStartTime = DateTime.Now,
                User = await _userManager.FindByNameAsync(userName)
            };
            _trackerContext.UserTrackings.Add(userTracking);
            _trackerContext.SaveChanges();
        }

        public async Task StopTracker(Guid trackerId)
        {
            Tracker trackerDb = _trackerContext.Trackers.FirstOrDefault(t => t.TrackerId == trackerId);
            trackerDb.IsActiveTracker = false;
            UserTracking userTrackingDb = _trackerContext.UserTrackings.FirstOrDefault(ut => ut.Tracker == trackerDb && ut.TrackerStopTime == null);
            userTrackingDb.TrackerStopTime = DateTime.Now;
            _trackerContext.SaveChanges();
        }
    }
}
