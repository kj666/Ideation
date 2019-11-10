using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdeaAPI.Models;
using IdeaAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace IdeaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IdeaController : ControllerBase
    {
        private readonly IdeaService _ideaService;

        public IdeaController(IdeaService ideaServie)
        {
            _ideaService = ideaServie;
        }

        [HttpGet]
        public ActionResult<List<Research>> Get() => _ideaService.Get();
    }
}
