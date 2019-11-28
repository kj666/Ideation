using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IdeaAPI.Models
{
    public class SearchResult
    {
        public List<LinkResult> Links { get; set; }
        public int nextPage { get; set; }
    }

    public class LinkResult
    {
        public string link { get; set; }

        public string title { get; set; }

        public string snippet { get; set; }
    }

    public class SearchRequest
    {
        public string query { get; set; }
        public string startIndex { get; set; }
    }
}
