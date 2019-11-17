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

        #region Research

        [HttpGet("research")]
        public ActionResult<List<Research>> GetResearches() => _ideaService.GetAllResearches();

        [HttpGet("research/user/{username}")]
        public ActionResult<List<Research>> GetResearchByUserName(string username) => _ideaService.GetResearchByUsername(username);

        /// <summary>
        /// Add new research to specified username
        /// </summary>
        /// <param name="research"></param>
        /// <returns></returns>
        [HttpPost("research/user/{username}")]
        public ActionResult<Research> CreateResearch(Research research, string username) => _ideaService.CreateUserResearch(research, username);

        [HttpGet("research/{researchName}")]
        public ActionResult<Research> GetResearch(string researchName) => _ideaService.GetResearchByName(researchName);

        #endregion Research


        [HttpGet("words/random")]
        public async Task<List<Word>> CallWordAPI()
        {
            using (var client = new HttpClient())
            {
                var content = await client.GetStringAsync("https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=10&api_key=hcjtmdkyfyp7wb7znn47m2o6ezs8d1e82hvf7xkv87hf7bb4h");
                return JsonConvert.DeserializeObject<List<Word>>(content);
            }
        }


        #region User

        [HttpGet("user")]
        public ActionResult<List<User>> GetUsers() => _ideaService.GetAllUsers();

        [HttpPost("user")]
        public ActionResult<User> CreateUser(User user) => _ideaService.CreateUser(user);

        [HttpGet("user/{username}")]
        public ActionResult<User> GetUser(string username) => _ideaService.GetUser(username);

        [HttpGet("user/exist/username/{username}")]
        public Boolean UserUsernameExist(string username) => _ideaService.UserUsernameExist(username);

        [HttpGet("user/exist/email/{email}")]
        public Boolean UserEmailExist(string email) => _ideaService.UserEmailExist(email);

        #endregion User
    }
}
