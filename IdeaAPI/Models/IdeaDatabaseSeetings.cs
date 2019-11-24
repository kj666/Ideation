
namespace IdeaAPI.Models
{
    public class IdeationDatabaseSettings : IIdeationDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IIdeationDatabaseSettings
    {
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }

    }
}
