import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CookieService } from 'ngx-cookie-service';
import { MustMatch } from './customValidator/MustMatch';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLogin: boolean = true;
  submittedLoginForm = false;
  submittedRegisterForm = false;
  loginOrCreateLabel: string = "Login to Your";
  isInvalidLoginOrPassword: boolean = false;
  isInvalidRegister: boolean = false;
  isRegisterComplete: boolean = false;
  isForgotPassword: boolean = false;
  forgotPasswordForm: FormGroup;
  submittedForgotPasswordForm: boolean = false;
  isInvalidForgotPassword: boolean = false;
  isValidForgotPassword: boolean = false;

  private siteKey: string = '6LdbqvUUAAAAAKQDDEvqzWI1JoA0uG--V9yKYhzz';
  private lang: string = "en";

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private ngxUiLoaderService: NgxUiLoaderService, private cookieService: CookieService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      recaptcha: ['', Validators.required],
    },
    {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
      recaptcha: ['', Validators.required],
    });
  }

  get form() {
    if (!this.isForgotPassword) {
      return this.isLogin ? this.loginForm.controls : this.registerForm.controls;
    }
    else {
      return this.forgotPasswordForm.controls;
    }
  }

  onSubmitLogin() {
    this.submittedLoginForm = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.ngxUiLoaderService.startLoader("LoginLoader");
    this.isInvalidLoginOrPassword = false;
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      this.ngxUiLoaderService.stopLoader("LoginLoader");
        this.submittedLoginForm = false;
      if (res.isSucceeded) {
        this.cookieService.set('UserName', this.loginForm.value.email);
        this.router.navigate(['home']);
      }
      else {
        this.isInvalidLoginOrPassword = true;
      }
    });
  }

  onSubmitRegister() {
    this.submittedRegisterForm = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    
    this.ngxUiLoaderService.startLoader("LoginLoader");
    this.isInvalidRegister = false;
    this.isRegisterComplete = false
    this.authService.register(this.registerForm.value).subscribe((res: any) => {
      this.ngxUiLoaderService.stopLoader("LoginLoader");
      this.submittedRegisterForm = false;
      if (res.isSucceeded) {
        this.isRegisterComplete = true;
      }
      else {
        this.isRegisterComplete = false;
        this.isInvalidRegister = true;
      }
    });
  }

  changeForm() {
    this.submittedLoginForm = false;
    this.submittedRegisterForm = false;
    this.isLogin = !this.isLogin;
    this.loginOrCreateLabel = this.isLogin ? "Login to Your" : "Create";
  }

  forgotPassword() {
    this.isForgotPassword = !this.isForgotPassword;
  }

  onSubmitorgotPassword() {
    this.submittedForgotPasswordForm = true;
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.ngxUiLoaderService.startLoader("LoginLoader");
    this.isInvalidForgotPassword = false;
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe((res: any) => {
      this.ngxUiLoaderService.stopLoader("LoginLoader");
      this.submittedForgotPasswordForm = false;
      if (res.isSucceeded) {
        this.isValidForgotPassword = true;
      }
      else {
        this.isInvalidForgotPassword = true;
      }
    });
  }
}
