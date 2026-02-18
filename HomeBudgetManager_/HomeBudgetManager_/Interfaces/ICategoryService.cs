using HomeBudgetManager_.Dto.Category;
using HomeBudgetManager_.Models;

namespace HomeBudgetManager_.Interfaces
{
    /// <summary>
    /// Define os contratos responsáveis pelo gerenciamento
    /// das categorias utilizadas na classificação das transações.
    /// 
    /// Permite operações de CRUD sobre as categorias financeiras.
    /// </summary>
    public interface ICategoryService
    {
        Task<List<CategoryModel>> GetAllCategoriesAsync();
        Task<CategoryModel> GetCategoryByIdAsync(int id);
        Task<CategoryModel> CreateCategoryAsync(CreateCategoryDto categoryDto);
        Task<CategoryModel> UpdateCategoryAsync(int id, UpdateCategoryDto categoryDto);
        Task<bool> DeleteCategoryAsync(int id);
    }
}
