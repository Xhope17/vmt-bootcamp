namespace TalentInsights.Application.Models.Responses
{
    public class GenericResponse<T>
    {

        public string Message { get; set; }

        public DateTime TimeStamp { get; set; } = DateTimeOffset.UtcNow.DateTime;

        public T Data { get; set; }


        public required string Cliente { get; set; } = string.Empty;

        //prueba
        public Z OtroGeneric<Z>(Z data)
        {
            return data;
        }

    }
}
