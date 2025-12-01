using System.Threading.Tasks;

namespace NuVerse.Application.Interfaces.Repositories
{
    public interface IRecaptchaService
    {
        Task<bool> VerifyAsync(string? token, string? remoteIp = null);
    }
}
