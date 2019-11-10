using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace IdeaAPI.Models
{
    public class Research
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string User { get; set; }

        public List<string> Keywords { get; set; }

        public List<string> Results { get; set; }

    }
}