using CsharpIntroduction.Startup.Interfaces;
using CsharpIntroduction.Startup.Models;

namespace CsharpIntroduction.Startup.Clases
{

    internal class Application(string name, string version) : IApplication
    {
        //private string _nameApp = "CsharpIntruduction";
        //private string _version = "v0.1.0";

        //public Application(string name, string version) { 

        //}

        private List<Command> _command = [];

        private void InitCommands()
        {
            _command.Add(new Command()
            {
                Id = 1,
                Description = "Mostar un mensaje",
                Usage = "<message>",
                Return = "Message: <message>"

            });

            _command.Add(new Command()
            {
                Id = 2,
                Description = "Sumar una cantidad",
                Usage = "<number> <number>",
                Return = "Result: <number>"

            });
        }

        public void ShowHelp()
        {
            var message = $"""

                --------------------------
                {name} {version}

                --------------------------
                commandos:
                {string.Join("\n", _command.Select((cmd) => $"{cmd.Id}. {cmd.Description}. \n {cmd.Usage}. \n{cmd.Return}"))}
                --------------------------
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
            //Console.BackgroundColor = ConsoleColor.DarkGreen;
            //Console.WriteLine(question);
            //Console.ResetColor();

            ShowMessage(question, color);
            return Console.ReadLine();
        }

        public void Start()
        {
            InitCommands();

            while (true)
            {
                this.ShowHelp();

                try
                {
                    //ShowQuestion("Seleccione una opción: ");
                    var comandoId = Convert.ToInt32(ShowQuestion("Seleccione una opción: ", ConsoleColor.Blue));


                    var argumento = ShowQuestion("Argumento:", ConsoleColor.Yellow);

                    if (string.IsNullOrEmpty(argumento))
                    {
                        //ShowMessage(argumento);
                        throw new ArgumentException(argumento);
                    }

                    var findCommand = _command.Where((cmd) => cmd.Id == comandoId).FirstOrDefault();

                    if (findCommand is null)
                    {
                        throw new Exception("Comando no encontrado");
                    }

                    if (findCommand.Id == comandoId)
                    {
                        ShowMessage(argumento);
                    }

                }

                catch (NullReferenceException e)
                {
                    Console.WriteLine("El argumento es obligatorio");
                }

                catch (FormatException)
                {
                    Console.WriteLine("Debe ingresar un número válido. Agregue una opción correcta");
                }
                catch (Exception e)
                {

                    ShowMessage(e.Message);
                }

            }
        }


    }
}
