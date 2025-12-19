using NuVerse.Application.Interfaces.Repositories;
using NuVerse.Domain.DTOs;

namespace NuVerse.Infrastructure.Services
{
public class ChemistryLabService : IChemistryLabService
{
    private readonly List<ChemistryLabDto> _experiments = new()
    {
        new ChemistryLabDto {
            Id = 1,
            Title = "Acid + Base Reaction",
            Steps = new List<string> {
                "Add 5ml of acid to the tube",
                "Add 5ml of base to another tube",
                "Mix slowly and observe",
                "Finish"
            }
        },
        new ChemistryLabDto {
            Id = 2,
            Title = "Salt Dissolving Experiment",
            Steps = new List<string> {
                "Fill half the tube with water",
                "Add 1 spoon of salt",
                "Stir until dissolved",
                "Observe transparency"
            }
        },
        new ChemistryLabDto {
            Id = 3,
            Title = "Simple Distillation",
            Steps = new List<string> {
                "Heat mixture until vaporization",
                "Capture vapor in cool tube",
                "Observe condensation"
            }
        }
    };

    public List<ChemistryLabDto> GetAllExperiments() => _experiments;
    public ChemistryLabDto? GetExperimentById(int id) =>
        _experiments.Find(e => e.Id == id);
}
}