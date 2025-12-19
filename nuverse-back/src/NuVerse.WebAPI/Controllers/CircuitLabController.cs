using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NuVerse.Application.Interfaces.Repositories;

namespace NuVerse.WebAPI.Controllers;

[ApiController]
[Route("api/circuitlabs")]
public class CircuitLabController : ControllerBase
{
    private readonly ICircuitLabService _service;
    private readonly ILogger<CircuitLabController> _logger;

    public CircuitLabController(ICircuitLabService service, ILogger<CircuitLabController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll() => Ok(_service.GetAllCircuitLabs());

    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var lab = _service.GetCircuitLab(id);
        if (lab == null)
        {
            _logger.LogInformation("Circuit lab {Id} not found.", id);
            return NotFound();
        }

        return Ok(lab);
    }
}
