namespace HomeBudgetManager_.Enums
{
    /// <summary>
    /// Define a finalidade de uma categoria.
    /// Utiliza o atributo [Flags] para permitir que a categoria
    /// seja válida para Income, Expense ou ambos.
    /// </summary>
    [Flags]
    public enum CategoryPurpose
    {
        None = 0,
        Income = 1,
        Expense = 2
    }
}
