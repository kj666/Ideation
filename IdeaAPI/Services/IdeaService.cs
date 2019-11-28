using IdeaAPI.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdeaAPI.Services
{
    public class IdeaService
    {
        private readonly IMongoCollection<Research> _researches;
        private readonly IMongoCollection<Favorite> _favorites;
        private readonly IMongoCollection<User> _users;

        public IdeaService(IIdeationDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _researches = database.GetCollection<Research>("Research");
            _users = database.GetCollection<User>("Users");
            _favorites = database.GetCollection<Favorite>("Favorites");
        }


        #region Research
        public List<Research> GetAllResearches() => _researches.Find(research => true).ToList();

        public List<Research> GetResearchByUsername(string username)
        {
            var user = GetUser(username);

            if (user != null)
                return _researches.Find(research => research.User_id == GetUser(username).Id).ToList();
            else
                return null;
        }

        public Research GetResearchByName(string researchName) => _researches.Find(research => research.Research_name == researchName).FirstOrDefault();

        public Research CreateUserResearch(Research research, string username)
        {
            var user = GetUser(username);
            research.User_id = user.Id;
            research.Timestamp = DateTime.Now;
            _researches.InsertOne(research);
            return research;
        }


        public void Update(string id, Research researchIn) =>
            _researches.ReplaceOne(research => research.Id == id, researchIn);

        public void Remove(Research researchIn) =>
            _researches.DeleteOne(research => research.Id == researchIn.Id);

        public void Remove(string id) =>
            _researches.DeleteOne(research => research.Id == id);

        #endregion Research

        #region Favorite
        public Favorite CreateUserFavorite(Favorite favorite, string username)
        {
            var user = GetUser(username);
            favorite.User_id = user.Id;
            favorite.Timestamp = DateTime.Now;
            _favorites.InsertOne(favorite);
            return favorite;
        }

        public List<Favorite> GetFavoriteByUsername(string username)
        {
            var user = GetUser(username);

            if (user != null)
                return _favorites.Find(favorite => favorite.User_id == GetUser(username).Id).ToList();
            else
                return null;
        }

        #endregion Favorite

        #region User

        public List<User> GetAllUsers() => _users.Find(user => true).ToList();

        public User GetUser(string username) => _users.Find(user => user.Username == username).FirstOrDefault();

        public User CreateUser(User user)
        {
            if (UserUsernameExist(user.Email))
                user.Email = "Exists";

            if (UserUsernameExist(user.Username))
                user.Username = "Exists";

            if(user.Username != "Exists" && user.Email != "Exists")
                _users.InsertOne(user);
            return user;
        }

        public bool UserUsernameExist(string username)
        {
            var result = _users.Find(user => user.Username == username).FirstOrDefault();
            if (result == null)
                return false;
            else
                return true;
        }

        public bool UserEmailExist(string email)
        {
            var result = _users.Find(user => user.Email == email).FirstOrDefault();
            if (result == null)
                return false;
            else
                return true;
        }

        public User LoginUser(string email, string password)
        {
            User responseUser = new User();
            User authUser = _users.Find(user => user.Email == email).FirstOrDefault();
            if (authUser != null)
            {
                if (authUser.Email == email && authUser.Password == password)
                    responseUser = authUser;
                else
                {
                    responseUser.Email = "Invalid";
                    responseUser.Username = "Invalid";
                }
            }
            else
            {
                responseUser.Email = "Invalid";
                responseUser.Username = "Invalid";
            }
            return responseUser;
        }

        #endregion User
    }
}
