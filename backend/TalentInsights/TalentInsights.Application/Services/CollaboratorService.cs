using TalentInsights.Application.Helpers;
using TalentInsights.Application.Interfaces.Services;
using TalentInsights.Application.Models.DTOs;
using TalentInsights.Application.Models.Requets.Collaborator;
using TalentInsights.Application.Models.Responses;
using TalentInsights.Shared;
using TalentInsights.Shared.Helpers;

namespace TalentInsights.Application.Services
{
    public class CollaboratorService(Cache<CollaboratorDTO> cache) : ICollaboratorService
    {
        //private readonly Cache<CollaboratorDTO> _cache;

        //public CollaboratorService(Cache<CollaboratorDTO> cache)
        //{
        //    _cache = cache;
        //}

        public GenericResponse<CollaboratorDTO> Create(CreateCollaboratorRequest model)
        {
            var collaborator = new CollaboratorDTO
            {
                CollaboratorId = Guid.NewGuid(),
                FullName = model.FullName,
                GitlabProfile = model.GitlabProfile,
                Position = model.Position,
                CreatedAt = DateTimeHelper.UtcNow(),
                JoinedAt = DateTimeHelper.UtcNow()
            };
            cache.Add(collaborator.CollaboratorId.ToString(), collaborator);

            return ResponseHelper.Create(collaborator, "Colaborador creado correctamente");
        }



        //eliminar en cache usando el id del colaborador
        public GenericResponse<bool> Delete(Guid collaboratorId)
        {

            var isDeleted = cache.Get(collaboratorId.ToString());

            if (isDeleted is null)
            {
                return ResponseHelper.Create(false);
            }

            cache.Delete(collaboratorId.ToString());

            //return ResponseHelper.Create(result, result ? "Colaborador eliminado" : "No encontrado");

            return ResponseHelper.Create(true);
        }



        public GenericResponse<List<CollaboratorDTO>> Get(int limit, int offset)
        {
            //var all = _cache.Get();

            //var paged = all.Skip(offset).Take(limit).ToList();

            //return ResponseHelper.Create(paged);

            var colaboradores = cache.Get();
            return ResponseHelper.Create(colaboradores);
        }

        public GenericResponse<CollaboratorDTO?> Get(Guid collaboratorId)
        {
            var collaborator = cache.Get(collaboratorId.ToString());

            return ResponseHelper.Create(collaborator);
        }

        public GenericResponse<CollaboratorDTO> Update(Guid collaboratorId, UpdateCollaboratorRequestcs model)
        {
            var exist = cache.Get(collaboratorId.ToString());

            if (exist is null)
                return ResponseHelper.Create<CollaboratorDTO>(null!, "Colaborador no encontrado");

            exist.FullName = model.FullName;
            exist.GitlabProfile = model.GitlabProfile;
            exist.Position = model.Position;

            return ResponseHelper.Create(exist, "Colaborador actualizado correctamente");
        }
    }
}
