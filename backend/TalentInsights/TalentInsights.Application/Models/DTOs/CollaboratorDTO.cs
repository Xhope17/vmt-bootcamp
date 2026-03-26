namespace TalentInsights.Application.Models.DTOs
{
    public class CollaboratorDTO
    {
        public Guid CollaboratorId { get; set; }
        public required string FullName { get; set; } = null!;
        public string? GitlabProfile { get; set; }
        public required string Position { get; set; } = null!;
        public DateTime JoinedAt { get; set; }
        public bool isActive { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
