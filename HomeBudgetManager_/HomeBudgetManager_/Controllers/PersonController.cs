using HomeBudgetManager_.Dto.Person;
using HomeBudgetManager_.Models;
using HomeBudgetManager_.Interfaces;
using Microsoft.AspNetCore.Mvc;
using HomeBudgetManager_.Utils;

/// <summary>
/// Controller responsável por expor os endpoints
/// relacionados à entidade Pessoa.
/// </summary>
namespace HomeBudgetManager_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }

        /// <summary>
        /// Retorna todas as pessoas cadastradas.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<List<PersonModel>>> GetAll()
        {
            var persons = await _personService.GetAllPersonsAsync();

            return Ok(new ApiResponse<List<PersonModel>>
            {
                Status = 200,
                Message = "Lista de pesssoas cadastradas encontrada com sucesso",
                Data = persons
            });
        }

        /// <summary>
        /// Retorna uma pessoa com base no id informado.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonModel>> GetById(int id)
        {
            var person = await _personService.GetPersonByIdAsync(id);

            return Ok(new ApiResponse<PersonModel>
            {
                Status = 200,
                Message = "Pessoa encontrada com sucesso",
                Data = person
            });
        }

        /// <summary>
        /// Busca uma pessoa pelo nome informado via query strng.
        /// </summary>
        [HttpGet("search")]
        public async Task<ActionResult<List<PersonModel>>> GetByName([FromQuery] string name)
        {
            var persons = await _personService.GetPersonByNameAsync(name);

            return Ok(new ApiResponse<PersonModel>
            {
                Status = 200,
                Message = "Pessoa encontrada com sucesso",
                Data = persons
            }); ;
        }

        /// <summary>
        /// Cria uma nova pessoa.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ApiResponse<PersonModel>>> Create([FromBody] CreatePersonDto person)
        {
            var createdPerson = await _personService.CreatePersonAsync(person);

            return CreatedAtAction(nameof(GetById),
                new { id = createdPerson.Id },
                new ApiResponse<PersonModel>
                {
                    Status = 201,
                    Message = "Pessoa criada com sucesso",
                    Data = createdPerson
                });
        }


        /// <summary>
        /// Atualiza uma pessoa existente com base no id.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<PersonModel>> Update(int id, [FromBody] UpdatePersonDto person)
        {
            var updatedPerson = await _personService.UpdatePersonAsync(id, person);

            return Ok(new ApiResponse<PersonModel>
            {
                Status = 200,
                Message = "Pessoa atualizada com sucesso",
                Data = updatedPerson
            });
        }

        /// <summary>
        /// Remove uma pessoa do sistema.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _personService.DeletePersonAsync(id);

            return Ok(new ApiResponse<PersonModel> { Message = "Pessoa deletada com sucesso" });
        }
    }
}