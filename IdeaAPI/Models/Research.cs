using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace IdeaAPI.Models
{
    public class Research
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string User_id { get; set; }

        public string Research_name { get; set; }

        public List<string> Keywords { get; set; }

        public List<LinkResult> Results { get; set; }

        public DateTime Timestamp { get; set; }
        
    }

    public class Favorite
    {

    }

    public class Word
    {
        public int id { get; set; }
        public string word { get; set; }
    }
}