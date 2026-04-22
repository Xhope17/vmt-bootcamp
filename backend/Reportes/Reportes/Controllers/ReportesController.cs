using Microsoft.AspNetCore.Mvc;
using Reportes.Channels;
using Reportes.Classes;
using Reportes.Models.Dto;
using Reportes.Models.Reports;

namespace Reportes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportesController(ReportesChannel reportesChannel, Cache cache) : ControllerBase
    {
        [HttpPost("crear")]
        public async Task<IActionResult> Crear(CreateReportRequest model)
        {
            var newOrder = new OrderDto
            {
                Id = Guid.NewGuid(),
                Name = model.Name,
                Type = model.Type,
            };
            cache.Add(newOrder.Id.ToString(), newOrder);
            await reportesChannel.PublicAsync(newOrder);
            return Ok("Reporte se esta generando");
        }

        [HttpPost("consultar/{id:guid}")]
        public async Task<IActionResult> Consultar(Guid id)
        {

            cache.Add();
            return Ok("Reporte se esta generando");
        }
    }
}
