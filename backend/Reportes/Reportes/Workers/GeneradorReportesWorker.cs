using Microsoft.AspNetCore.SignalR;
using Reportes.Channels;
using Reportes.Hubs;
using Reportes.Models.Dto;

namespace Reportes.Workers
{
    public class GeneradorReportesWorker(ReportesChannel channel, Cache<OrderDto> cache, IHubContext<OrderHub> orderHubContext) : BackgroundService
    {
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {

            await foreach (var order in channel.ReadAllAsync(stoppingToken))
            {
                order.Status = "Generando";
                cache.Update(order.Id.ToString(), order);

                Console.WriteLine($"{order.Id} - {order.Name} - {order.Type} - {order.Status}");

                await orderHubContext.Clients.All.SendAsync("OrderStatusUpdate", order, stoppingToken);
                await Task.Delay(5000, stoppingToken);

                order.Status = "Generado";
            }
        }
    }
}
