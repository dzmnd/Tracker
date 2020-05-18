using Busiess.Context;
using Busiess.Interfaces;
using Busiess.Models.Db;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Busiess.Services
{
    public class EmailService: IEmailService
    {
        private readonly TrackerContext _trackerContext;
        private readonly IConfiguration _configuration;

        public EmailService(TrackerContext trackerContext, IConfiguration configuration) 
        {
            _trackerContext = trackerContext;
            _configuration = configuration;
        }

        public async Task SendRegistrationEmalAsync(string email, string userId, string userCode) 
        {
            var emailMessage = new MimeMessage();

            Email emailDb = _trackerContext.EmailTemplates.FirstOrDefault(e => e.EmailId == (int)Enum.Email.Register);

            emailMessage.From.Add(new MailboxAddress("Administration Tracker", "dez6686@mail.ru"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = emailDb.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = emailDb.Message.Replace("{callbackUrl}", $"{_configuration["WebClientUrl"]}/#/confirmEmail?userId={userId}&code={HttpUtility.UrlEncode(userCode)}")
            };
            await SendEmailAsync(emailMessage);
        }

        public async Task SendForgotPasswordEmalAsync(string email, string userId, string userCode)
        {
            var emailMessage = new MimeMessage();

            Email emailDb = _trackerContext.EmailTemplates.FirstOrDefault(e => e.EmailId == (int)Enum.Email.ForgotPassword);

            emailMessage.From.Add(new MailboxAddress("Administration Tracker", "dez6686@mail.ru"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = emailDb.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = emailDb.Message.Replace("{callbackUrl}", $"{_configuration["WebClientUrl"]}/#/resetPassword?userId={userId}&code={HttpUtility.UrlEncode(userCode)}")
            };
            await SendEmailAsync(emailMessage);
        }

        private async Task SendEmailAsync(MimeMessage emailMessage)
        {
            using (var client = new SmtpClient())
            {
                await client.ConnectAsync("smtp.mail.ru", 25, false);
                await client.AuthenticateAsync(_configuration["MailLogin"], _configuration["MailPassword"]);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }
        }
    }
}
