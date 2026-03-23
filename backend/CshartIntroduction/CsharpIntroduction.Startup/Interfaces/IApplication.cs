namespace CsharpIntroduction.Startup.Interfaces
{
    internal interface IApplication
    {
        void Start();
        void ShowMessage(string message, ConsoleColor color = ConsoleColor.White);

        string ShowQuestion(string question, ConsoleColor color = ConsoleColor.White);
        //string ShowQuestion(string question, ConsoleColor? color);

        void ShowHelp();


    }
}
