using Busiess.Interfaces;
using Busiess.Models.DataObject;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace TrackerAuthApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IEmailService _emailService;

        public AuthController(IAuthService authService, IEmailService emailService)
        {
            _authService = authService;
            _emailService = emailService;
        }

        [HttpPost]
        [Route("Register")]
        [AllowAnonymous]
        public async Task<object> Register(UserDataObject userDataObject) 
        {
            userDataObject = await _authService.RegisterAsync(userDataObject);
            if (userDataObject.IsRegisterComplete)
            {
                await _emailService.SendRegistrationEmalAsync(userDataObject.Email, userDataObject.UserId, userDataObject.UserCode);
            }
            return new { IsSucceeded = userDataObject.IsRegisterComplete };
        }

        [HttpGet]
        [Route("ConfirmEmail")]
        [AllowAnonymous]
        public async Task<bool> ConfirmEmail(string userId, string code)
        {
            return await _authService.ConfirmEmail(userId, code);
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public async Task<object> Login(UserDataObject userDataObject)
        {
            return await _authService.Login(userDataObject);
        }

        [HttpGet]
        [Route("IsSignedInUser")]
        [AllowAnonymous]
        public async Task<object> IsSignedInUser()
        {
            ClaimsPrincipal claimsPrincipal = HttpContext.User;
            return await _authService.IsSignedInUser(claimsPrincipal);
        }

        [HttpPost]
        [Route("Logout")]
        [AllowAnonymous]
        public async Task<bool> Logout()
        {
            return await _authService.Logout();
        }

        [HttpPost]
        [Route("ForgotPassword")]
        [AllowAnonymous]
        public async Task<object> ForgotPassword(UserDataObject userDataObject)
        {
            userDataObject = await _authService.ForgotPassword(userDataObject);
            if (!string.IsNullOrEmpty(userDataObject.UserCode))
            {
                await _emailService.SendForgotPasswordEmalAsync(userDataObject.Email, userDataObject.UserId, userDataObject.UserCode);
            }
            return new { IsSucceeded = !string.IsNullOrEmpty(userDataObject.UserCode) };
        }

        [HttpPost]
        [Route("ResetPassword")]
        [AllowAnonymous]
        public async Task<object> ResetPassword(UserDataObject userDataObject)
        {
            return await _authService.ResetPassword(userDataObject);
        }
    }
}
