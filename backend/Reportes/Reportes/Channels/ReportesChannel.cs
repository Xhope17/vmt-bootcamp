using Reportes.Models.Dto;
using System.Threading.Channels;

namespace Reportes.Channels
{
    public class ReportesChannel
    {
        private readonly Channel<OrderDto> _channel = Channel.CreateBounded<OrderDto>(10);

        public ValueTask PublicAsync(OrderDto order)
        {
            return _channel.Writer.WriteAsync(order);
        }

        public IAsyncEnumerable<OrderDto> ReadAllAsync(CancellationToken stoppingToken)
        {
            return _channel.Reader.ReadAllAsync();
        }
    }
}
