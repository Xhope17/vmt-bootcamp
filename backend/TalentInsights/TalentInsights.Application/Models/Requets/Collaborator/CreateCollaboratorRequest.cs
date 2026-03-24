using System.ComponentModel.DataAnnotations;
using TalentInsights.Shared.Constants;

namespace TalentInsights.Application.Models.Requets.Collaborator
{


    public class CreateCollaboratorRequest
    {
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        [MaxLength(150, ErrorMessage = ValidationConstants.MAX_LENGTH)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGTH)]

        public required string FullName { get; set; } = null!;

        [MaxLength(255, ErrorMessage = ValidationConstants.MAX_LENGTH)]
        [MinLength(10, ErrorMessage = ValidationConstants.MIN_LENGTH)]
        public string? GitlabProfile { get; set; }

        [Required(ErrorMessage = ValidationConstants.REQUIRED)]      //las otras 2 son obligatorias antes que esta
        [MaxLength(100, ErrorMessage = ValidationConstants.MAX_LENGTH)]
        [MinLength(5, ErrorMessage = ValidationConstants.MIN_LENGTH)]
        public required string Position { get; set; } = null!;
    }
}
