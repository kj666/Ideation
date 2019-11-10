
namespace IdeaAPI.Models
{
    public class IdeationDatabaseSettings : IIdeationDatabaseSettings
    {
        public string IdeaCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IIdeationDatabaseSettings
    {
        string IdeaCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }

    }
}
