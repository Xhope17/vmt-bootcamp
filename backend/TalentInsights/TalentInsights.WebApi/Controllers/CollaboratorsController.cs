using Microsoft.AspNetCore.Mvc;
using TalentInsights.Application.Helpers;
using TalentInsights.Application.Models.Requets.Collaborator;
using TalentInsights.Application.Services;

namespace TalentInsights.WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CollaboratorsController : ControllerBase
    {

        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] CreateCollaboratorRequest model)
        //{
        //    return Ok($"Usuario: {model.FullName}, gitlabprofile: {model.GitlabProfile}");
        //}

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCollaboratorRequest model)
        {
            var rsp = CollaboratorService
            return Ok($"Usuario: {model.FullName}, gitlabprofile: {model.GitlabProfile}");
        }


        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GetAllCollaboratorRequest model)
        {
            //$"Todos los usuarios: \n limit: {model.Limit}, outset: {model.Offset}, gitlabprofile: {model.GitlabProfile}
            List<string> users = ["Usuario 1", "Usuario 2", "Usuario 3"];

            return Ok(ResponseHelper.Create(users));
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            //var context = HttpContext;
            //var response = ;
            var usuario = $"{id}";


            return Ok(ResponseHelper.Create(usuario));
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update([FromBody] UpdateCollaboratorRequestcs model)
        {
            return Ok($"Usuario actualizado: \n nombre: {model.FullName}, gitlabprofile: {model.GitlabProfile}, posición: {model.Position}");
        }

        [HttpPatch("change-password/{id:guid}")]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody] ChangePasswordCollaboratorRequest model)
        {
            return Ok("Contraseña cambiada");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            return Ok($"Usuario eliminado correctamente");
        }


    }
}
