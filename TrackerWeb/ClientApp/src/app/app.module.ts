import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgxCaptchaModule } from 'ngx-captcha';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './login/confirmEmail/confirm-email.component';
import { AddTrackerModalComponent } from './home/add-tracker-modal/add-tracker-modal.component';
import { ResetPasswordComponent } from './login/resetPassword/reset-password.component';

import { AuthService } from './Services/auth.service';
import { TrackerService } from './Services/tracker.service';

import { routing } from './app.routing';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    AddTrackerModalComponent,
    ConfirmEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgxUiLoaderModule,
    ModalModule.forRoot(),
    routing
  ],
  providers: [
    AuthService,
    TrackerService,
    CookieService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
