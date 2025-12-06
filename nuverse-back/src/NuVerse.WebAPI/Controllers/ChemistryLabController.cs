using Microsoft.AspNetCore.Mvc;
using NuVerse.Application.Interfaces.Repositories;

namespace NuVerse.WebAPI.Controllers;

[ApiController]
[Route("api/chemistry")]
public class ChemistryLabController : ControllerBase
{
    private readonly IChemistryLabService _service;

    public ChemistryLabController(IChemistryLabService service)
    {
        _service = service;
    }

    [HttpGet("experiments")]
    public IActionResult GetExperiments() => Ok(_service.GetAllExperiments());

    [HttpGet("experiments/{id}")]
    public IActionResult GetExperiment(int id)
    {
        var exp = _service.GetExperimentById(id);
        if (exp == null) return NotFound();
        return Ok(exp);
    }
}
