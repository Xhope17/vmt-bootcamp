namespace Calculadora.Startup.Interfaces
{
    internal interface IApplication
    {
        public double sumar(double a, double b);
        public double restar(double a, double b);

        public double multiplicar(double a, double b);

        public double dividir(double a, double b);
    }
}
