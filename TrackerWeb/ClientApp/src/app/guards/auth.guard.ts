import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../Services/auth.service";
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, public router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isSignedInUser();
  }
}
