using Calculadora.Startup.Interfaces;

namespace Calculadora.Startup.Class
{
    internal class Application : ICalculadora
    {
        public double dividir(double a, double b)
        {
            return a + b;
        }

        public double multiplicar(double a, double b)
        {
            return a * b;
        }

        public double restar(double a, double b)
        {
            return a - b;
        }

        public double sumar(double a, double b)
        {
            return a + b;
        }

        public void ShowHelp()
        {
            var message = $"""

                ------------------------------------------
                Seleccione una de las siguiente opciones:
                1. Sumar
                2. Restar
                3. Multiplicar
                4. Dividir
                ------------------------------------------
                """;

            Console.WriteLine(message);
        }

        public void ShowMessage(string message, ConsoleColor color = ConsoleColor.White)
        {
            Console.ForegroundColor = color;
            Console.WriteLine($"Message:{message} ");
            Console.ResetColor();
        }

        public string ShowQuestion(string question, ConsoleColor color = ConsoleColor.White)
        {
            ShowMessage(question);
            return Console.ReadLine();
        }
        public void Start()
        {
            while (true)
            {
                try
                {
                    Console.WriteLine("Calculadora");
                    ShowHelp();

                    var argumento = ShowQuestion("Argumento:", ConsoleColor.Yellow);

                    if (string.IsNullOrEmpty(argumento))
                    {
                        //ShowMessage(argumento);
                        throw new ArgumentException(argumento);
                    }
                }
                catch (Exception)
                {

                    throw;
                }
            }
        }
    }

}
