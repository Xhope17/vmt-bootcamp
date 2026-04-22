using System.ComponentModel.DataAnnotations;

namespace Reportes.Models.Reports
{
    public class CreateReportRequest
    {
        [Required]
        public string Name { get; set; } = null!;
        public string Type { get; set; } = null!;
    }
}
