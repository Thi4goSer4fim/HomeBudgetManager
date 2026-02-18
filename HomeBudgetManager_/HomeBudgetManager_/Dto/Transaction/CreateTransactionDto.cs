using HomeBudgetManager_.Enums;
using HomeBudgetManager_.Models;
using System.ComponentModel.DataAnnotations;

namespace HomeBudgetManager_.Dto.Transaction
{
    /// <summary>
    /// Representa os dados necessários para a criação
    /// de uma nova transação.
    /// </summary>
    public class CreateTransactionDto
    {
        [Required(ErrorMessage = "A descrição é obrigatória.")]
        [StringLength(400, MinimumLength = 2)]
        public string Description { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser positivo.")]
        public decimal Value { get; set; }

        [Required]
        public TransactionType Type { get; set; }

        [Required]
        public int CategoryId { get; set; }

        //id da pessoa que realizou a transação
        [Required]
        public int PersonId { get; set; }
    }

}
