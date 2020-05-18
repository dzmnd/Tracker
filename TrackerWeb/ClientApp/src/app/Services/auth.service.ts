import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { trackerAppConfig } from '../tracker-app.config';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(trackerAppConfig.API.Auth.Register, user)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  confirmEmail(userId: string, code: string) {
    return this.http.get(`${trackerAppConfig.API.Auth.ConfirmEmail}?userId=${userId}&code=${encodeURIComponent(code)}`)
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  login(user: any) {
    return this.http.post(trackerAppConfig.API.Auth.Login, user, { withCredentials: true })
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  logout() {
    return this.http.post(trackerAppConfig.API.Auth.Logout, {}, { withCredentials: true })
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  isSignedInUser() {
     return this.http.get(`${trackerAppConfig.API.Auth.IsSignedInUser}`, { withCredentials: true })
      .pipe(map((res: any) => {
        return res.isSignedInUser;
      }));
  }

  forgotPassword(user: any) {
    return this.http.post(trackerAppConfig.API.Auth.ForgotPassword, user, { withCredentials: true })
      .pipe(map((res: Response) => {
        return res;
      }));
  }

  resetPassword(user: any) {
    return this.http.post(trackerAppConfig.API.Auth.ResetPassword, user)
      .pipe(map((res: Response) => {
        return res;
      }));
  }
}
