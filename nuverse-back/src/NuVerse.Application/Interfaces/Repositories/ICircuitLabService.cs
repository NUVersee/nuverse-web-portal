using System.Collections.Generic;
using NuVerse.Domain.DTOs;

namespace NuVerse.Application.Interfaces.Repositories
{
    public interface ICircuitLabService
    {
        List<CircuitLabDto> GetAllCircuitLabs();
        CircuitLabDto? GetCircuitLab(int id);
    }
}