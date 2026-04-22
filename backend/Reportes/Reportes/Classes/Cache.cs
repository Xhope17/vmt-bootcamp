using Microsoft.Extensions.Caching.Memory;

namespace Reportes.Classes
{
    public class Cache(IMemoryCache memoryCache)
    {
        public T Create<T>(string key, TimeSpan expiration, T value)
        {
            try
            {
                var create = memoryCache.GetOrCreate(key, (factory) =>
                {
                    factory.SlidingExpiration = expiration;
                    return value;
                });

                return create is null ? throw new Exception("No se pudo establecer el cache") : create;
            }
            catch
            {
                throw;
            }
        }

        public bool Delete(string key)
        {
            try
            {
                memoryCache.Remove(key);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public T? Get<T>(string key)
        {
            try
            {
                return memoryCache.Get<T>(key);
            }
            catch
            {
                throw;
            }
        }

        public void Udate(string data, T Data)
        {

        }
    }
}
