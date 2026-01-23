using System.Threading.Tasks;
using NuVerse.Domain.DTOs;

namespace NuVerse.Application.Interfaces.Services
{
    public interface IContactService
    {
        Task SubmitContactFormAsync(ContactFormDto dto, string? remoteIp);
    }
}
