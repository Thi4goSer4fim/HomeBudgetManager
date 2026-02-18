using HomeBudgetManager_.Enums;
using HomeBudgetManager_.Models;
using System.ComponentModel.DataAnnotations;

namespace HomeBudgetManager_.Dto.Transaction
{
    /// <summary>
    /// Representa os dados necessários para atualizar
    /// uma transação no sistema.
    /// </summary>
    public class UpdateTransactionDto
    {
        [StringLength(400, MinimumLength = 2)]
        public string? Description { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser positivo.")]
        public decimal? Value { get; set; }

        public TransactionType? Type { get; set; }

        //id da categoria da transação
        public int? CategoryId { get; set; }

        //id da pessoa que realizou a transação
        public int? PersonId { get; set; }
    }
}
