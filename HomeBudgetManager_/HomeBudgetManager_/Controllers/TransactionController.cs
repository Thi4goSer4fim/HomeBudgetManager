using Microsoft.AspNetCore.Mvc;
using HomeBudgetManager_.Dto.Transaction;
using HomeBudgetManager_.Models;
using HomeBudgetManager_.Interfaces;
using HomeBudgetManager_.Utils;

/// <summary>
/// Controller responsável por expor os endpoints
/// relacionados à entidade Transações.
/// </summary>
namespace HomeBudgetManager_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }


        /// <summary>
        /// Cadastra uma transação no sistema.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<TransactionModel>>> CreateTransaction(
            [FromBody] CreateTransactionDto dto)
        {
            var transaction = await _transactionService.CreateTransactionAsync(dto);

            return Ok(new ApiResponse<TransactionModel>
            {
                Status = 201,
                Message = "Transação criada com sucesso",
                Data = transaction
            });
        }

        /// <summary>
        /// Atualiza os dados de uma transação baseado no id.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<TransactionModel>>> UpdateTransaction(
            int id,
            [FromBody] UpdateTransactionDto dto)
        {
            var transaction = await _transactionService.UpdateTransactionAsync(id, dto);

            return Ok(new ApiResponse<TransactionModel>
            {
                Status = 200,
                Message = "Transação atualizada com sucesso",
                Data = transaction
            });
        }

        /// <summary>
        /// Deleta uma transação realizada no sistema baseado no id.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<string>>> DeleteTransaction(int id)
        {
            await _transactionService.DeleteTransactionAsync(id);

            return Ok(new ApiResponse<string>
            {
                Status = 200,
                Message = "Transação deletada com sucesso"
            });
        }

        /// <summary>
        /// Retorna todas as transações realizadas.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<ApiResponse<List<TransactionModel>>>> GetAllTransactions()
        {
            var transactions = await _transactionService.GetAllTransactionsAsync();

            return Ok(new ApiResponse<List<TransactionModel>>
            {
                Status = 200,
                Message = "Transações recuperadas com sucesso",
                Data = transactions
            });
        }

        /// <summary>
        /// Retorna uma transação realizada pelo id.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<TransactionModel>>> GetTransactionById(int id)
        {
            var transaction = await _transactionService.GetTransactionByIdAsync(id);

            return Ok(new ApiResponse<TransactionModel>
            {
                Status = 200,
                Message = "Transação recuperada com sucesso",
                Data = transaction
            });
        }

        /// <summary>
        /// Retorna uma transação realizada baseado no id de uma pessoa.
        /// </summary>
        [HttpGet("person/{personId}")]
        public async Task<ActionResult<ApiResponse<List<TransactionModel>>>>
            GetTransactionsByPersonId(int personId)
        {
            var transactions = await _transactionService
                .GetTransactionsByPersonIdAsync(personId);

            return Ok(new ApiResponse<List<TransactionModel>>
            {
                Status = 200,
                Message = "Transações da pessoa recuperadas com sucesso",
                Data = transactions
            });
        }

        /// <summary>
        /// Retorna uma transação realizada baseado no id de uma categoria.
        /// </summary>
        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<ApiResponse<List<TransactionModel>>>>
            GetTransactionsByCategoryId(int categoryId)
        {
            var transactions = await _transactionService
                .GetTransactionsByCategoryIdAsync(categoryId);

            return Ok(new ApiResponse<List<TransactionModel>>
            {
                Status = 200,
                Message = "Transações da categoria recuperadas com sucesso",
                Data = transactions
            });
        }

        /// <summary>
        /// Retorna as receitas, despesas e saldo liquido de todas as transações.
        /// </summary>
        [HttpGet("totals")]
        public async Task<ActionResult<ApiResponse<TotalsTransactionDto>>>
            GetTotalsTransactions()
        {
            var totals = await _transactionService.GetTotalsTransactionsAsync();

            return Ok(new ApiResponse<TotalsTransactionDto>
            {
                Status = 200,
                Message = "Totais gerais recuperados com sucesso",
                Data = totals
            });
        }

        /// <summary>
        /// Retorna as receitas, despesas e saldo liquido das transações realizadas por uma pessoa especifica.
        /// </summary>
        [HttpGet("totals/person/{personId}")]
        public async Task<ActionResult<ApiResponse<TotalsTransactionDto>>>
            GetTotalsPerPerson(int personId)
        {
            var totals = await _transactionService
                .GetTotalsTransactionPerPersonAsync(personId);

            return Ok(new ApiResponse<TotalsTransactionDto>
            {
                Status = 200,
                Message = "Totais por pessoa recuperados com sucesso",
                Data = totals
            });
        }

        /// <summary>
        /// Retorna as receitas, despesas e saldo liquido das transações realizadas por uma categoria especifica.
        /// </summary>
        [HttpGet("totals/category/{categoryId}")]
        public async Task<ActionResult<ApiResponse<TotalsTransactionDto>>>
            GetTotalsPerCategory(int categoryId)
        {
            var totals = await _transactionService
                .GetTotalsTransactionPerCategoryAsync(categoryId);

            return Ok(new ApiResponse<TotalsTransactionDto>
            {
                Status = 200,
                Message = "Totais por categoria recuperados com sucesso",
                Data = totals
            });
        }
    }
}
