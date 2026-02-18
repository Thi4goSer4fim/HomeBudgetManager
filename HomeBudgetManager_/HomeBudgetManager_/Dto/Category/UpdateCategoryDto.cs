using HomeBudgetManager_.Enums;
using System.ComponentModel.DataAnnotations;

namespace HomeBudgetManager_.Dto.Category
{
    /// <summary>
    /// Representa os dados necessários para atualizar
    /// uma categoria no sistema.
    /// </summary>
    public class UpdateCategoryDto
    {
        [StringLength(400, ErrorMessage = "A descrição da categoria não deve ultrapassar 400 caracteres")]
        [MinLength(2, ErrorMessage = "A descrição deve conter pelo menos 2 caracteres")]
        public string? Description { get; set; }

        public CategoryPurpose? Purpose { get; set; }
    }
}
