using Microsoft.AspNetCore.Mvc;
using TalentInsights.Application.Models.Requets.Collaborator;

namespace TalentInsights.WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CollaboratorsController : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCollaboratorRequest model)
        {
            return Ok($"usuario: {model.FullName}");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GetAllCollaboratorRequest model)
        {
            return Ok($"Todos los usuarios: limit: {model.Limit}, outset: {model.Offset}, gitlabprofile: {model.GitlabProfile}");
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok($"{id}");
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromBody] UpdateCollaboratorRequestcs model)
        {
            return Ok("usuario actualizado");
        }

        [HttpPatch("change-password/{id:guid}")]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody] ChangePasswordCollaboratorRequest model)
        {
            return Ok("Contraseña cambiada");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok("usuario creado");
        }
    }
}
