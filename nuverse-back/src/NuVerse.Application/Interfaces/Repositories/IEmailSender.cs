using System.Threading.Tasks;

namespace NuVerse.Application.Interfaces.Repositories
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string fullName,string fromEmail, string phoneNumber, string reason);
    }
}
