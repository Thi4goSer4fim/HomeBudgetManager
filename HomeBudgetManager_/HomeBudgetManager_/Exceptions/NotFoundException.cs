namespace HomeBudgetManager_.Exceptions
{
    /// <summary>
    /// Exceção personalizada lançada quando um recurso
    /// não é encontrado no sistema.
    /// </summary>
    public class NotFoundException : Exception
    {
        /// <summary>
        /// Inicializa uma nova instância da exceção
        /// com uma mensagem personalizada.
        /// </summary>
        /// <param name="message">Mensagem descritiva do erro.</param>
        public NotFoundException(String message) : base(message) { }
    }
}
