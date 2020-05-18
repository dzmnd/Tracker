"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var confirm_email_component_1 = require("./login/confirmEmail/confirm-email.component");
var auth_guard_1 = require("./guards/auth.guard");
var reset_password_component_1 = require("./login/resetPassword/reset-password.component");
exports.routes = [
    { path: '', component: login_component_1.LoginComponent, pathMatch: 'full' },
    { path: 'confirmEmail', component: confirm_email_component_1.ConfirmEmailComponent },
    { path: 'resetPassword', component: reset_password_component_1.ResetPasswordComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: true });
//# sourceMappingURL=app.routing.js.map