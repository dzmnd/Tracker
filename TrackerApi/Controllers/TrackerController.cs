using Busiess.Interfaces;
using Busiess.Models.DataObject;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TrackerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackerController : ControllerBase
    {
        private readonly ITrackerService _trackerService;
        public TrackerController(ITrackerService trackerService)
        {
            _trackerService = trackerService;
        }

        [HttpPost]
        [Route("AddTracker")]
        [Authorize(Roles = "user")]
        public async Task<object> AddTracker(TrackerDataObject trackerDataObject) 
        {
            return await _trackerService.AddTracker(trackerDataObject);
        }

        [HttpGet]
        [Route("GetTrackers")]
        [Authorize(Roles = "user")]
        public async Task<List<TrackerDataObject>> GetTrackers(string userName)
        {
            return await _trackerService.GetTrackers(userName);
        }

        [HttpPost]
        [Route("DeleteTracker")]
        [Authorize(Roles = "user")]
        public async Task<object> DeleteTracker(Guid trackerId)
        {
            return await _trackerService.DeleteTracker(trackerId);
        }

        [HttpPost]
        [Route("StartTracker")]
        [Authorize(Roles = "user")]
        public async Task StartTracker(Guid trackerId, string userName)
        {
            await _trackerService.StartTracker(trackerId, userName);
        }

        [HttpPost]
        [Route("StopTracker")]
        [Authorize(Roles = "user")]
        public async Task StopTracker(Guid trackerId)
        {
            await _trackerService.StopTracker(trackerId);
        }

    }
}
