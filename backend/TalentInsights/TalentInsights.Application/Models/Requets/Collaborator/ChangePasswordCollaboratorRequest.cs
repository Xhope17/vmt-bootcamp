using System.ComponentModel.DataAnnotations;
using TalentInsights.Shared.Constants;

namespace TalentInsights.Application.Models.Requets.Collaborator
{
    public class ChangePasswordCollaboratorRequest
    {
        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        public string currentPassword { get; set; }

        [Required(ErrorMessage = ValidationConstants.REQUIRED)]
        public string newPassword { get; set; }

    }
}
