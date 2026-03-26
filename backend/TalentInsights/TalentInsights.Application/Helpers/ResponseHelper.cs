using TalentInsights.Application.Models.Responses;

namespace TalentInsights.Application.Helpers
{
    public static class ResponseHelper
    {

        public static GenericResponse<T> Create<T>(T data, string message = "Solicitud realizada correctamente")
        {
            var response = new GenericResponse<T>
            {
                Data = data,
                Message = message,

            };

            //response.Cliente.ToLower();

            return response;
        }

    }
}
