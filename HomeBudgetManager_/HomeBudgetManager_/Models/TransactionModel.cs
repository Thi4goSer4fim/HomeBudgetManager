using HomeBudgetManager_.Enums;

namespace HomeBudgetManager_.Models
{
    /// <summary>
    /// Representa uma transação financeira do sistema.
    /// Podendo ser do tipo receita ou despesa.
    /// </summary>
    public class TransactionModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public TransactionType Type { get; set; }

        public int CategoryId { get; set; }
        public CategoryModel Category { get; set; }

        /// Pessoa responsável pela transação.
        public int PersonId { get; set; }
        public PersonModel Person { get; set; }
    }
}
