import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService, Time } from 'ngx-ui-loader';
import { Tracker } from '../models/Tracker';
import { TrackerService } from '../Services/tracker.service';
import { CookieService } from 'ngx-cookie-service';
import { AddTrackerModalComponent } from './add-tracker-modal/add-tracker-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private trackerService: TrackerService, private ngxUiLoaderService: NgxUiLoaderService, private cookieService: CookieService) { }

  trackers: Tracker[] = [];
  timer: NodeJS.Timeout;
  @ViewChild('addTrackerModal', { static: false }) addTrackerModal: AddTrackerModalComponent;

  ngOnInit() {
    this.ngxUiLoaderService.startLoader("TrackerLoader");
    this.getTrackers();
  }

  getTrackers() {
    let userName = this.cookieService.get('UserName');
    this.trackerService.getTrackers(userName).subscribe((trackers: Tracker[]) => {
      this.trackers = trackers;
      let activeTracker = this.trackers.filter(t => t.isActiveTracker)[0];
      if (activeTracker != null && activeTracker != undefined) {
        let dateNow = new Date();
        let dateStartTracker = new Date(activeTracker.trackerStartTime);
        let diffDateMinutes = Math.floor((dateNow.getTime() - dateStartTracker.getTime()) / 1000 / 60);
        if (activeTracker.trackerTotalTime > diffDateMinutes) {
          activeTracker.trackerTimeLeft = activeTracker.trackerTotalTime - diffDateMinutes;
        }
        else {
          activeTracker.trackerTimeLeft = 0;
          activeTracker.overTime = diffDateMinutes - activeTracker.trackerTotalTime;
        }
        this.strartTimer(activeTracker);
      }
      this.ngxUiLoaderService.stopLoader("TrackerLoader");
    });
  }

  start(tracker: Tracker) {
    tracker.trackerTimeLeft = tracker.trackerTotalTime;
    let activeTracker = this.trackers.filter(t => t.isActiveTracker == true);
    if (activeTracker.length > 0) {
      this.stop(activeTracker[0]);
    }
    tracker.isActiveTracker = true;
    for (var _tracker in this.trackers) {
      if (JSON.stringify(tracker) != JSON.stringify(this.trackers[_tracker])) {
        this.trackers[_tracker].isActiveTracker = false;
      }
    }
    this.strartTimer(tracker);
    let userName = this.cookieService.get('UserName');
    this.trackerService.startTracker(tracker.trackerId, userName).subscribe();
  }

  stop(tracker: Tracker) {
    tracker.trackerTimeLeft = 0;
    tracker.isActiveTracker = false;
    tracker.overTime = 0;
    this.stopTimer();
    this.trackerService.stopTracker(tracker.trackerId).subscribe();
  }

  strartTimer(tracker: Tracker) {
    this.timer = setInterval(this.timerFunction, 60000, tracker);
  }

  private timerFunction(tracker: Tracker) {
    if (tracker.trackerTimeLeft > 0) {
      tracker.trackerTimeLeft--;
    } else {
      alert("Overtime!!!");
      tracker.overTime++;
    }
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  addNewTracker() {
    this.addTrackerModal.show();
  }

  addNewTrackerComplete(event: boolean) {
    this.getTrackers();
  }

  deleteTracker(tracker: Tracker) {
    this.trackerService.deleteTracker(tracker.trackerId).subscribe(res => this.getTrackers() );
  }
}
