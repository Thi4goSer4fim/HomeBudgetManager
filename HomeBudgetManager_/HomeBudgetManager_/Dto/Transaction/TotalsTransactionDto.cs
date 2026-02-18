using HomeBudgetManager_.Models;


namespace HomeBudgetManager_.Dto.Transaction
{
    /// <summary>
    /// Representa os dados necessários para calcular
    /// a receita, despesa e saldo líquido.
    /// 
    /// Pode ser usado tanto para calcular os valores totais, 
    /// quanto para calcular baseado em uma pessoa
    /// ou categoria especifica
    /// </summary>
    public class TotalsTransactionDto
    {
        public List<TransactionModel> Transactions { get; set; } = new();
        public decimal TotalIncome { get; set; }
        public decimal TotalExpense { get; set; }
        public decimal Balance => TotalIncome - TotalExpense;
    }

}
