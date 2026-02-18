using HomeBudgetManager_.Data;
using HomeBudgetManager_.Dto.Category;
using HomeBudgetManager_.Dto.Person;
using HomeBudgetManager_.Exceptions;
using HomeBudgetManager_.Interfaces;
using HomeBudgetManager_.Models;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// Serviço responsável pelas operações relacionadas à entidade Categoria.
/// Implementa regras de negócio e interage com o BD.
/// </summary>
namespace HomeBudgetManager_.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _dbContext;

        // Injeta o contexto do banco de dados via Injeção de Dependência.
        public CategoryService(AppDbContext appDbContext) 
        {
            _dbContext = appDbContext;
        }


        /// <summary>
        /// Cria uma nova categoria no sistema com base nos dados fornecidos.
        /// Persiste a entidade no banco de dados.
        /// </summary>
        public async Task<CategoryModel> CreateCategoryAsync(CreateCategoryDto categoryDto)
        {
            var category = new CategoryModel
            {
                Description = categoryDto.Description,
                Purpose = categoryDto.Purpose
            };

            _dbContext.Category.Add(category);
            await _dbContext.SaveChangesAsync();

            return category;
        }

        /// <summary>
        /// Deleta uma categoria cadastrada anteriormente no sistema.
        /// </summary>
        public async Task<bool> DeleteCategoryAsync(int id)
        {
            var category = await _dbContext.Category.FirstOrDefaultAsync(c => c.Id == id);

            if (category == null)
                return false;

            _dbContext.Category.Remove(category);
            await _dbContext.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Retorna uma lista com todas as categorias cadastradas.
        /// </summary>
        public async Task<List<CategoryModel>> GetAllCategoriesAsync()
        {
            var categories = await _dbContext.Category.ToListAsync();
            return categories;
        }

        /// <summary>
        /// Retorna uma categoria cadastrada no sistema baseado no id informado.
        /// </summary>
        public async Task<CategoryModel> GetCategoryByIdAsync(int id)
        {
            var category = await _dbContext.Category.FirstOrDefaultAsync(c => c.Id == id);

            if(category == null)
                throw new NotFoundException($"Pessoa não encontrada");

            return category;
        }

        /// <summary>
        /// Atualiza uma categoria já cadastrada no sistema com base nos dados fornecidos.
        /// </summary>
        public async Task<CategoryModel> UpdateCategoryAsync(int id, UpdateCategoryDto category)
        {
            var categoryToUpdate = await _dbContext.Category.FirstOrDefaultAsync(c => c.Id == id);

            if (categoryToUpdate == null)
                throw new NotFoundException($"Categoria não encontrada");

            categoryToUpdate.Description = category.Description ?? categoryToUpdate.Description;
            categoryToUpdate.Purpose = category.Purpose ?? categoryToUpdate.Purpose;

            _dbContext.Category.Update(categoryToUpdate);
            await _dbContext.SaveChangesAsync();

            return categoryToUpdate;
        }
    }
}
