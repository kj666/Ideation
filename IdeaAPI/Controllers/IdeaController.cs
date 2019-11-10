using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using IdeaAPI.Models;
using IdeaAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

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

        [HttpGet("random")]
        public async Task<List<Word>> CallWordAPI()
        {
            using (var client = new HttpClient())
            {
                var content = await client.GetStringAsync("https://87938f90-8e2c-4c73-a8c8-b6ca7478ad85.mock.pstmn.io/workAPI");
                return JsonConvert.DeserializeObject<List<Word>>(content);
            }
        }

        public class Word
        {
            public int id { get; set; }
            public string word { get; set; }
        }
    }
}
