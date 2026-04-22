using Reportes.Channels;
using Reportes.Models.Dto;

namespace Reportes.Workers
{
    public class GeneradorReportesWorker(ReportesChannel channel, Cache<OrderDto> cache) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await foreach (var order in channel.ReadAllAsync(stoppingToken))
            {
                order.Status = "Generando";


                Console.WriteLine($"{order.Id} - {order.Name} - {order.Type} - {order.Status}");

                await Task.Delay(5000, stoppingToken);

                order.Status = "Generado";
            }
        }
    }
}
