using System.Net;
using System.Text.Json;
using HomeBudgetManager_.Exceptions;


/// <summary>
/// Middleware responsável pelo tratamento global de exceções.
/// Intercepta erros lançados durante o processamento da requisição
/// e retorna uma resposta HTTP padronizada.
/// </summary>
public class ExceptionMiddleware
{
    /// Delegate que representa o próximo componente do pipeline.
    private readonly RequestDelegate _next;


    /// <summary>
    /// Construtor que recebe o próximo middleware da cadeia.
    /// </summary>
    /// <param name="next">Próximo middleware a ser executado.</param>
    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    /// <summary>
    /// Método responsável por interceptar a requisição HTTP.
    /// Executa o próximo middleware e captura possíveis exceções.
    /// </summary>
    /// <param name="context">Contexto da requisição HTTP atual.</param>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            context.Response.StatusCode = (int)HttpStatusCode.NotFound;

            // Define que a resposta será retornada no formato JSON.
            context.Response.ContentType = "application/json";

            var response = new
            {
                status = 404,
                message = ex.Message
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
        catch (Exception)
        {
            context.Response.StatusCode = 500;
            context.Response.ContentType = "application/json";

            var response = new
            {
                status = 500,
                message = "Erro interno no servidor."
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

