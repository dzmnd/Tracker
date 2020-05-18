import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ConfirmEmailComponent } from './login/confirmEmail/confirm-email.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './login/resetPassword/reset-password.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'confirmEmail', component: ConfirmEmailComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
