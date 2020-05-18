import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { trackerAppConfig } from '../tracker-app.config';
import { Tracker } from '../models/Tracker';

@Injectable()
export class TrackerService {
  constructor(private http: HttpClient) { }

  addTracker(tracker: Tracker) {
    return this.http.post(trackerAppConfig.API.Tracker.AddTracker, tracker, { withCredentials: true })
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  getTrackers(userName: string) {
    return this.http.get(`${trackerAppConfig.API.Tracker.GetTrackers}?userName=${userName}`, { withCredentials: true })
      .pipe(map((res: Tracker[]) => {
        return res;
      }));
  }

  deleteTracker(trackerId: string) {
    return this.http.post(`${trackerAppConfig.API.Tracker.DeleteTracker}?trackerId=${trackerId}`, {}, { withCredentials: true })
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  startTracker(trackerId: string, userName: string) {
    return this.http.post(`${trackerAppConfig.API.Tracker.StartTracker}?trackerId=${trackerId}&userName=${userName}`, { }, { withCredentials: true })
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  stopTracker(trackerId: string) {
    return this.http.post(`${trackerAppConfig.API.Tracker.StopTracker}?trackerId=${trackerId}`, { }, { withCredentials: true })
      .pipe(map((res: Response) => {
        return res;
      }));
  }
}
