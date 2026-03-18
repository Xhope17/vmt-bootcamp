namespace Calculadora.Startup.Interfaces
{
    internal interface ICalculadora
    {
        public double sumar(double a, double b);
        public double restar(double a, double b);

        public double multiplicar(double a, double b);

        public double dividir(double a, double b);

        void Start();
        //void InitCommands();
        string ShowQuestion(string question, ConsoleColor color = ConsoleColor.White);

        void ShowMessage(string message, ConsoleColor color = ConsoleColor.White);

        void ShowHelp();

    }
}
