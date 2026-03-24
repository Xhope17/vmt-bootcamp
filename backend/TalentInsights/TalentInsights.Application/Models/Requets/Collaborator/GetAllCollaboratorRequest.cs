namespace TalentInsights.Application.Models.Requets.Collaborator
{
    public class GetAllCollaboratorRequest
    {
        public int? Limit { get; set; }

        public int? Offset { get; set; }

        public string? GitlabProfile { get; set; }
    }
}
