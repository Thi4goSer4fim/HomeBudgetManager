using HomeBudgetManager_.Dto.Transaction;
using HomeBudgetManager_.Models;

namespace HomeBudgetManager_.Interfaces
{
    /// <summary>
    /// Define os contratos de serviço responsáveis pelo gerenciamento
    /// das transações financeiras do sistema.
    /// 
    /// Esta interface abstrai as operações de CRUD e consultas
    /// relacionadas a transações, incluindo filtros e cálculos agregados.
    /// </summary>
    public interface ITransactionService
    {
        Task<List<TransactionModel>> GetAllTransactionsAsync();
        Task<TransactionModel> GetTransactionByIdAsync(int id);
        Task<TransactionModel> CreateTransactionAsync(CreateTransactionDto TransactionDto);
        Task<TransactionModel> UpdateTransactionAsync(int id, UpdateTransactionDto TransactionDto);
        Task DeleteTransactionAsync(int id);

        Task<List<TransactionModel>> GetTransactionsByPersonIdAsync(int personId);
        Task<List<TransactionModel>> GetTransactionsByCategoryIdAsync(int categoryId);
        Task<TotalsTransactionDto> GetTotalsTransactionsAsync();
        Task<TotalsTransactionDto> GetTotalsTransactionPerPersonAsync(int personId);
        Task<TotalsTransactionDto> GetTotalsTransactionPerCategoryAsync(int categoryId);
    }
}
