using Microsoft.AspNetCore.Mvc;
using TalentInsights.Application.Helpers;
using TalentInsights.Application.Interfaces.Services;
using TalentInsights.Application.Models.Requets.Collaborator;

namespace TalentInsights.WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CollaboratorsController(ICollaboratorService collaboratorService) : ControllerBase
    {

        //[HttpPost]
        //public async Task<IActionResult> Create([FromBody] CreateCollaboratorRequest model)
        //{
        //    return Ok($"Usuario: {model.FullName}, gitlabprofile: {model.GitlabProfile}");
        //}

        //public async Task<IActionResult> Create([FromBody] CreateCollaboratorRequest model)
        //{
        //    var rsp = _collaboratorService.Create(model);
        //    return Ok(rsp);
        //}


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCollaboratorRequest model)
        {
            var rsp = collaboratorService.Create(model);
            //return Ok(rsp + $"Usuario: {model.FullName}, gitlabprofile: {model.GitlabProfile}");
            return Ok(rsp);
        }


        //var rsp = _collaboratorService.Get(model.Limit ?? 10, model.Offset ?? 0);
        //return Ok(rsp);

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GetAllCollaboratorRequest model)
        {
            //$"Todos los usuarios: \n limit: {model.Limit}, outset: {model.Offset}, gitlabprofile: {model.GitlabProfile}
            //List<string> users = ["Usuario 1", "Usuario 2", "Usuario 3"];

            var rsp = collaboratorService.Get(model.Limit ?? 0, model.Offset ?? 0);


            return Ok(rsp);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            //var context = HttpContext;
            //var response = ;
            //var rsp = $"{id}";

            var rsp = collaboratorService.Get(id);


            return Ok(ResponseHelper.Create(id));
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCollaboratorRequestcs model)
        {
            var rsp = collaboratorService.Update(id, model);

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
            var rsp = collaboratorService.Delete(id);

            return Ok($"Usuario eliminado");
        }


    }
}
