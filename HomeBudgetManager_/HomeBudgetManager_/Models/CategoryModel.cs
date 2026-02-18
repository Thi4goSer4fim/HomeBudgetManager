using HomeBudgetManager_.Enums;


namespace HomeBudgetManager_.Models
{
    /// <summary>
    /// Representa uma categora cadastrada do sistema.
    /// Podendo ser do tipo receita, despesa ou ambas.
    /// </summary>
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public CategoryPurpose Purpose { get; set; }
    }
}
