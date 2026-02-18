using HomeBudgetManager_.Dto.Person;
using HomeBudgetManager_.Models;

namespace HomeBudgetManager_.Interfaces
{
    /// <summary>
    /// Define os contratos responsáveis pelo gerenciamento
    /// das pessoas vinculadas às transações financeiras.
    /// 
    /// Responsável por operações de CRUD e consultas específicas
    /// relacionadas às pessoas cadastradas no sistema.
    /// </summary>
    public interface IPersonService
    {
        Task<List<PersonModel>> GetAllPersonsAsync();
        Task<PersonModel> GetPersonByIdAsync(int id);
        Task<PersonModel> GetPersonByNameAsync(string name);
        Task<PersonModel> CreatePersonAsync(CreatePersonDto personDto);
        Task<PersonModel> UpdatePersonAsync(int id, UpdatePersonDto personDto);
        Task DeletePersonAsync(int id);
    }
}
