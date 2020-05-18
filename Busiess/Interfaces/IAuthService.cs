using Busiess.Models.DataObject;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Busiess.Interfaces
{
    public interface IAuthService
    {
        Task<UserDataObject> RegisterAsync(UserDataObject userDataObject);
        Task<bool> ConfirmEmail(string userId, string code);
        Task<object> Login(UserDataObject userDataObject);
        Task<bool> Logout();
        Task<object> IsSignedInUser(ClaimsPrincipal claimsPrincipal);
        Task<UserDataObject> ForgotPassword(UserDataObject userDataObject);
        Task<object> ResetPassword(UserDataObject userDataObject);
    }
}
