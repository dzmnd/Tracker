using System.Threading.Tasks;

namespace Busiess.Interfaces
{
    public interface IEmailService
    {
        Task SendRegistrationEmalAsync(string email, string userId, string userCode);
        Task SendForgotPasswordEmalAsync(string email, string userId, string userCode);
    }
}
