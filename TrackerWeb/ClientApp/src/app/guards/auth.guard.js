"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthGuard = /** @class */ (function () {
    function AuthGuard(authService) {
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        this.authService.isSignedInUser().subscribe();
        return confirm('Вы уверены, что хотите перейти?');
    };
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map