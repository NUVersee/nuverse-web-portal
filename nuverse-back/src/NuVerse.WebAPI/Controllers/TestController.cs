using Microsoft.AspNetCore.Mvc;

namespace NuVerse.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetTest()
        {
            return Ok("NuVerse API is alive ✨");
        }
    }
}