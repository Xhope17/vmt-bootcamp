namespace Calculadora.Startup.Models
{
    internal class Command
    {
        public required int Id { get; set; }
        public required string Description { get; set; }
        public required string Usage { get; set; }
        public required string Return { get; set; }
    }
}
