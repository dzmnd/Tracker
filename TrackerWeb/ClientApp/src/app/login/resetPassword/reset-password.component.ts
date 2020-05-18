import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MustMatch } from '../customValidator/MustMatch';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private ngxUiLoaderService: NgxUiLoaderService, private formBuilder: FormBuilder) { }

  userId: string;
  code: string;
  resetPasswordForm: FormGroup;
  submittedResetPasswordForm: boolean = false;

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams.userId;
    this.code = this.route.snapshot.queryParams.code;
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get form() {
    return this.resetPasswordForm.controls;
  }

  onSubmitResetPassword() {
    this.submittedResetPasswordForm = true;

    // stop here if form is invalid
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.ngxUiLoaderService.startLoader("ResetPasswordLoader");
    this.authService.resetPassword({ UserId: this.userId, UserCode: this.code, Password: this.resetPasswordForm.value.password }).subscribe((res: any) => {
      this.ngxUiLoaderService.stopLoader("ResetPasswordLoader");
      this.submittedResetPasswordForm = false;
      if (res.isSucceeded) {
        this.router.navigate(['']);
      }
    });
  }
}
