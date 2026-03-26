using TalentInsights.Application.Helpers;
using TalentInsights.Application.Interfaces.Services;
using TalentInsights.Application.Models.DTOs;
using TalentInsights.Application.Models.Requets.Collaborator;
using TalentInsights.Application.Models.Responses;
using TalentInsights.Shared.Helpers;

namespace TalentInsights.Application.Services
{
    public class CollaboratorService : ICollaboratorService
    {
        GenericResponse<CollaboratorDTO> ICollaboratorService.Create(CreateCollaboratorRequest model)
        {
            var create = new CollaboratorDTO
            {
                CollaboratorId = Guid.NewGuid(),
                FullName = model.FullName,
                GitlabProfile = model.GitlabProfile,
                Position = model.Position,
                CreateAt = DateTimeHelper.UtcNow(),
                JoinedAt = DateTimeHelper.UtcNow()
            };

            return ResponseHelper.Create(create);
        }



        //eliminar en cache usando el id del colaborador
        public GenericResponse<bool> Delete(Guid collaborateId)
        {

            return ResponseHelper.Create(true);
        }



        GenericResponse<List<CollaboratorDTO>> ICollaboratorService.Get(int limit, int offset)
        {
            throw new NotImplementedException();
        }

        GenericResponse<CollaboratorDTO?> ICollaboratorService.Get(Guid collaboratorId)
        {
            throw new NotImplementedException();
        }

        GenericResponse<CollaboratorDTO> ICollaboratorService.Update(Guid collaboratorId, UpdateCollaboratorRequestcs model)
        {
            throw new NotImplementedException();
        }
    }
}
