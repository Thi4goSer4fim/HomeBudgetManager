using HomeBudgetManager_.Data;
using HomeBudgetManager_.Dto.Transaction;
using HomeBudgetManager_.Enums;
using HomeBudgetManager_.Exceptions;
using HomeBudgetManager_.Interfaces;
using HomeBudgetManager_.Models;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// Serviço responsável pelas operações relacionadas às transações.
/// Contém validações de integridade e regras de negócio antes da persistência dos dados.
/// </summary>
namespace HomeBudgetManager_.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _dbContext;

        public TransactionService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Cria uma nova transação financeira.
        /// Valida a existência da categoria e da pessoa antes da persistência.
        /// </summary>
        public async Task<TransactionModel> CreateTransactionAsync(CreateTransactionDto dto)
        {
            var categoryExists = await _dbContext.Category
                .AnyAsync(c => c.Id == dto.CategoryId);

            if (!categoryExists)
                throw new NotFoundException("Categoria não encontrada.");

            var personExists = await _dbContext.Persons
                .AnyAsync(p => p.Id == dto.PersonId);

            if (!personExists)
                throw new NotFoundException("Pessoa não encontrada.");

            var transaction = new TransactionModel
            {
                Description = dto.Description,
                Value = dto.Value,
                Type = dto.Type,
                CategoryId = dto.CategoryId,
                PersonId = dto.PersonId
            };

            _dbContext.Transactions.Add(transaction);
            await _dbContext.SaveChangesAsync();

            return transaction;
        }

        /// <summary>
        /// Atualiza uma transação existente.
        /// Permite alteração parcial dos campos e valida mudanças de relacionamento.
        /// </summary>
        public async Task<TransactionModel> UpdateTransactionAsync(int id, UpdateTransactionDto dto)
        {
            var transaction = await _dbContext.Transactions
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
                throw new NotFoundException("Transação não encontrada.");

            if (dto.CategoryId.HasValue && dto.CategoryId != transaction.CategoryId)
            {
                var categoryExists = await _dbContext.Category
                    .AnyAsync(c => c.Id == dto.CategoryId.Value);

                if (!categoryExists)
                    throw new NotFoundException("Categoria não encontrada.");

                transaction.CategoryId = dto.CategoryId.Value;
            }

            if (dto.PersonId.HasValue && dto.PersonId != transaction.PersonId)
            {
                var personExists = await _dbContext.Persons
                    .AnyAsync(p => p.Id == dto.PersonId.Value);

                if (!personExists)
                    throw new NotFoundException("Pessoa não encontrada.");

                transaction.PersonId = dto.PersonId.Value;
            }

            if (!string.IsNullOrWhiteSpace(dto.Description))
                transaction.Description = dto.Description;

            if (dto.Value.HasValue)
                transaction.Value = dto.Value.Value;

            if (dto.Type.HasValue)
                transaction.Type = dto.Type.Value;

            await _dbContext.SaveChangesAsync();

            return transaction;
        }

        /// <summary>
        /// Deleta uma transação realizada anteriormente no sistema.
        /// </summary>
        public async Task DeleteTransactionAsync(int id)
        {
            var transaction = await _dbContext.Transactions
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
                throw new NotFoundException("Transação não encontrada.");

            _dbContext.Transactions.Remove(transaction);
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Retorna todas as transações com seus respectivos relacionamentos.
        /// </summary>
        public async Task<List<TransactionModel>> GetAllTransactionsAsync()
        {
            return await _dbContext.Transactions.Include(t => t.Person).Include(t => t.Category).ToListAsync();
        }

        /// <summary>
        /// Retorna uma transação baseado em um id específico.
        /// </summary>
        public async Task<TransactionModel> GetTransactionByIdAsync(int id)
        {
            var transaction = await _dbContext.Transactions.Include(t => t.Category).Include(t => t.Person)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
                throw new NotFoundException("Transação não encontrada.");

            return transaction;
        }

        /// <summary>
        /// Retorna as transações vinculadas a uma categoria específica.
        /// </summary>
        public async Task<List<TransactionModel>> GetTransactionsByCategoryIdAsync(int categoryId)
        {
            //verifica se a categoria realmente existe antes de prosseguir
            var categoryExists = await _dbContext.Category
                .AnyAsync(c => c.Id == categoryId);

            if (!categoryExists)
                throw new NotFoundException("Categoria não encontrada.");

            return await _dbContext.Transactions
                .Where(t => t.CategoryId == categoryId).Include(t => t.Category).Include(t => t.Person)
                .ToListAsync();
        }

        /// <summary>
        /// Retorna as transações vinculadas a uma pessoa específica.
        /// </summary>
        public async Task<List<TransactionModel>> GetTransactionsByPersonIdAsync(int personId)
        {
            //verifica se a pessoa realmente existe antes de prosseguir
            var personExists = await _dbContext.Persons
                .AnyAsync(p => p.Id == personId);

            if (!personExists)
                throw new NotFoundException("Pessoa não encontrada.");

            return await _dbContext.Transactions
                .Where(t => t.PersonId == personId).Include(t => t.Category).Include(t => t.Person)
                .ToListAsync();
        }

        /// <summary>
        /// Calcula os totais de entradas e saídas para uma categoria específica.
        /// </summary>
        public async Task<TotalsTransactionDto> GetTotalsTransactionPerCategoryAsync(int categoryId)
        {
            var categoryExists = await _dbContext.Category
                .AnyAsync(c => c.Id == categoryId);

            if (!categoryExists)
                throw new NotFoundException("Categoria não encontrada.");

            var transactions = await _dbContext.Transactions.Include(t => t.Category).Include(t => t.Person)
                .Where(t => t.CategoryId == categoryId)
                .ToListAsync();

            return BuildTotalsResponse(transactions);
        }

        /// <summary>
        /// Calcula os totais de entradas e saídas para uma pessoa específica.
        /// </summary>
        public async Task<TotalsTransactionDto> GetTotalsTransactionPerPersonAsync(int personId)
        {
            var personExists = await _dbContext.Persons
                .AnyAsync(p => p.Id == personId);

            if (!personExists)
                throw new NotFoundException("Pessoa não encontrada.");

            var transactions = await _dbContext.Transactions.Include(t => t.Category).Include(t => t.Person)
                .Where(t => t.PersonId == personId)
                .ToListAsync();

            return BuildTotalsResponse(transactions);
        }

        /// <summary>
        /// Calcula os totais gerais de todas as transações.
        /// </summary>
        public async Task<TotalsTransactionDto> GetTotalsTransactionsAsync()
        {
            var transactions = await _dbContext.Transactions.Include(t => t.Category).Include(t => t.Person)
                .ToListAsync();

            return BuildTotalsResponse(transactions);
        }

        /// <summary>
        /// Consolida os valores das transações,
        /// separando total de entradas e saídas.
        /// </summary>
        private TotalsTransactionDto BuildTotalsResponse(List<TransactionModel> transactions)
        {
            // Calcula o total de entradas
            var totalIncome = transactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Value);

            // Calcula o total de saídas
            var totalExpense = transactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Value);

            // Retorna o DTO com os valores consolidados
            return new TotalsTransactionDto
            {
                Transactions = transactions,
                TotalIncome = totalIncome,
                TotalExpense = totalExpense
            };
        }
    }
}
