using HomeBudgetManager_.Enums;
using System.ComponentModel.DataAnnotations;

namespace HomeBudgetManager_.Dto.Category
{
    /// <summary>
    /// Representa os dados necessários para a criação
    /// de uma nova categoria.
    /// </summary>
    public class CreateCategoryDto
    {
        [Required(ErrorMessage = "A Descrição é obrigatória para cadastrar uma categoria")]
        [StringLength(400, ErrorMessage = "A descrição da categoria não deve ultrapassar 400 caracteres")]
        [MinLength(2, ErrorMessage = "A descrição deve conter pelo menos 2 caracteres")]
        public string Description { get; set; }

        [Required(ErrorMessage = "O tipo da categoria é obrigatório para cadastrar uma categoria")]
        public CategoryPurpose Purpose { get; set; }
    }
}
