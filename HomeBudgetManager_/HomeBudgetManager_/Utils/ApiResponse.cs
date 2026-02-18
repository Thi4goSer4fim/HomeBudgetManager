namespace HomeBudgetManager_.Utils
{
    /// <summary>
    /// Representa um modelo genérico de resposta da API.
    /// Padroniza o formato das respostas retornadas ao cliente.
    /// </summary>
    /// <typeparam name="T">Tipo de dado retornado na resposta.</typeparam>
    public class ApiResponse<T>
    {
        //codigo de status HTTP da resposta
        public int Status { get; set; }

        //Mensagem da resposta
        public string Message { get; set; }

        //Dados retornados pela api
        //Pode ser nulo quando não houver conteúdo
        public T? Data { get; set; }

        //lista de erros 
        public List<string>? Errors { get; set; }
    }
}
