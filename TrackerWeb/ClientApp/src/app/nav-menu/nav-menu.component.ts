import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(private authService: AuthService, private router: Router, private cookieService: CookieService) { }

  logOut() {
    this.authService.logout().subscribe((res: any) => {
      this.cookieService.delete('UserName');
      this.router.navigate([''])
    });
  }
}
