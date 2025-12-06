
namespace NuVerse.Application.Interfaces.Repositories
{
    public interface IChemistryLabService
    {
    List<NuVerse.Domain.DTOs.ChemistryLabDto> GetAllExperiments();
    NuVerse.Domain.DTOs.ChemistryLabDto? GetExperimentById(int id);
    }
}