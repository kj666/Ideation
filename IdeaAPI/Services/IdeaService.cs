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
        private readonly IMongoCollection<Research> _reaserches;

        public IdeaService(IIdeationDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _reaserches = database.GetCollection<Research>(settings.IdeaCollectionName);
        }

        public List<Research> Get() => _reaserches.Find(research => true).ToList();

        public Research Create(Research research)
        {
            _reaserches.InsertOne(research);
            return research;
        }

        public void Update(string id, Research researchIn) =>
            _reaserches.ReplaceOne(research => research.Id == id, researchIn);

        public void Remove(Research researchIn) =>
            _reaserches.DeleteOne(research => research.Id == researchIn.Id);

        public void Remove(string id) =>
            _reaserches.DeleteOne(research => research.Id == id);
    }
}
