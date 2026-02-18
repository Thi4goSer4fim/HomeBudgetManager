using HomeBudgetManager_.Dto.Category;
using HomeBudgetManager_.Models;
using HomeBudgetManager_.Interfaces;
using HomeBudgetManager_.Utils;
using Microsoft.AspNetCore.Mvc;


/// <summary>
/// Controller responsável por expor os endpoints
/// relacionados à entidade Categoria.
/// </summary>
namespace HomeBudgetManager_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        /// <summary>
        /// Retorna todas as categorias cadastradas.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<CategoryModel>>> GetAll()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();

            return Ok(new ApiResponse<List<CategoryModel>>
            {
                Status = 200,
                Message = "Lista de categorias cadastradas encontrada com sucesso",
                Data = categories
            });
        }

        /// <summary>
        /// Retorna uma categoria com base no id informado.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryModel>> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);

            if (category == null)
                return NotFound();

            return Ok(new ApiResponse<CategoryModel>
            {
                Status = 200,
                Message = "Categoria encontrada com sucesso",
                Data = category
            });
        }

        /// <summary>
        /// Cria uma nova categoria.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<CategoryModel>>> CreateCategory([FromBody] CreateCategoryDto category)
        {
            var createdCategory = await _categoryService.CreateCategoryAsync(category);

            return CreatedAtAction(nameof(GetCategoryById),
                new { id = createdCategory.Id },
                new ApiResponse<CategoryModel>
                {
                    Status = 201,
                    Message = "Categoria criada com sucesso",
                    Data = createdCategory
                });
        }

        /// <summary>
        /// Atualiza uma categoria ja cadastrada.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<CategoryModel>>> UpdateCategory(int id, [FromBody] UpdateCategoryDto category)
        {
            var updatedCategory = await _categoryService.UpdateCategoryAsync(id, category);

            if (updatedCategory == null)
                return NotFound();

            return Ok(new ApiResponse<CategoryModel>
            {
                Status = 200,
                Message = "Categoria atualizada com sucesso",
                Data = updatedCategory
            });
        }

        /// <summary>
        /// Deleta uma categoria cadastrada.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<bool>>> DeleteCategory(int id)
        {
            var deleted = await _categoryService.DeleteCategoryAsync(id);
            if (!deleted)
                return NotFound();
            return Ok(new ApiResponse<bool>
            {
                Status = 200,
                Message = "Categoria deletada com sucesso",
                Data = true
            });
        }
    }
}
