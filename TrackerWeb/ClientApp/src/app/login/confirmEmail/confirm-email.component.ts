import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  userId: string;
  code: string;

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams.userId;
    this.code = this.route.snapshot.queryParams.code;
    this.confirmEmail();
  }

  confirmEmail() {
    this.authService.confirmEmail(this.userId, this.code).subscribe(res => {
      this.router.navigate(['']);
    });
  }
}
