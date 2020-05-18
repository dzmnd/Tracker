using Busiess.Interfaces;
using Busiess.Models.DataObject;
using Busiess.Models.Db;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Busiess.Services
{
    public class AuthService: IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager) 
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<UserDataObject> RegisterAsync(UserDataObject userDataObject)
        {
            User user = new User
            {
                Email = userDataObject.Email,
                FirstName = userDataObject.FirstName,
                LastName = userDataObject.FirstName,
                MiddleName = userDataObject.MiddleName,
                UserName = userDataObject.Email
            };

            IdentityResult registerResult = await _userManager.CreateAsync(user, userDataObject.Password);

            if (registerResult.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, "user");

                userDataObject.IsRegisterComplete = true;
                userDataObject.UserCode = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                userDataObject.UserId = user.Id;
            }
            else
            {
                userDataObject.IsRegisterComplete = false;
            }
            return userDataObject;
        }

        public async Task<bool> ConfirmEmail(string userId, string code)
        {
            User user = await _userManager.FindByIdAsync(userId);
            IdentityResult result = await _userManager.ConfirmEmailAsync(user, code);
            return true;
        }

        public async Task<object> Login(UserDataObject userDataObject)
        {
            User user = await _userManager.FindByNameAsync(userDataObject.Email);
            if (user != null && await _userManager.IsEmailConfirmedAsync(user))
            {
                SignInResult result = await _signInManager.PasswordSignInAsync(userDataObject.Email, userDataObject.Password, false, false);
                return new { IsSucceeded = result.Succeeded };
            }
            else
            {
                return new { IsSucceeded = false };
            }
        }

        public async Task<object> IsSignedInUser(ClaimsPrincipal claimsPrincipal)
        {
            bool isSignedIn = _signInManager.IsSignedIn(claimsPrincipal);
            return new { IsSignedInUser = isSignedIn };
        }

        public async Task<bool> Logout()
        {
            await _signInManager.SignOutAsync();
            return true;
        }

        public async Task<UserDataObject> ForgotPassword(UserDataObject userDataObject)
        {
            User user = await _userManager.FindByNameAsync(userDataObject.Email);
            if (user != null && await _userManager.IsEmailConfirmedAsync(user))
            {
                string code = await _userManager.GeneratePasswordResetTokenAsync(user);
                return new UserDataObject {
                                              Email = userDataObject.Email,
                                              UserCode = code,
                                              UserId = user.Id
                                          };
            }
            else
            {
                return new UserDataObject {
                                              Email = userDataObject.Email,
                                              UserId = user.Id
                                          };
            }
        }

        public async Task<object> ResetPassword(UserDataObject userDataObject)
        {
            User user = await _userManager.FindByIdAsync(userDataObject.UserId);
            string code = userDataObject.UserCode;
            IdentityResult result = await _userManager.ResetPasswordAsync(user, code, userDataObject.Password);
            return new { IsSucceeded = true };
        }
    }
}
