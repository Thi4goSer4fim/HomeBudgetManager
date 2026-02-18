using HomeBudgetManager_.Data;
using HomeBudgetManager_.Dto.Person;
using HomeBudgetManager_.Exceptions;
using HomeBudgetManager_.Interfaces;
using HomeBudgetManager_.Models;
using Microsoft.EntityFrameworkCore;


/// <summary>
/// Serviço responsável pelas operações relacionadas à entidade Pessoa.
/// Implementa regras de negócio e interage com o BD.
/// </summary>
namespace HomeBudgetManager_.Services
{
    public class PersonService : IPersonService
    {

        private readonly AppDbContext _dbContext;

        /// Injeta o contexto do banco de dados via Injeção de Dependência.
        public PersonService(AppDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// Retorna a lista completa de pessoas cadastradas.
        /// </summary>
        public async Task<List<PersonModel>> GetAllPersonsAsync()
        {
            var persons = await _dbContext.Persons.ToListAsync();
            return persons;
        }

        /// <summary>
        /// Retorna uma pessoa cadastrada no sistema baseado no id
        /// </summary>
        public async Task<PersonModel> GetPersonByIdAsync(int id)
        {
            var person = await _dbContext.Persons.FirstOrDefaultAsync(p => p.Id == id);

            if (person == null) 
                //Lança exceção caso a pessoa não seja encontrada baseado no id
                throw new NotFoundException($"Pessoa não encontrada");

            return person;
        }

        /// <summary>
        /// Retorna uma pessoa cadastrada no sistema baseado no nome
        /// </summary>
        public async Task<PersonModel> GetPersonByNameAsync(string name)
        {
            var person = await _dbContext.Persons.FirstOrDefaultAsync(p => p.Name == name);

            if (person == null)
                //Lança exceção caso a pessoa não seja encontrada baseado no id
                throw new NotFoundException($"Pessoa não encontrada");

            return person;
        }

        /// <summary>
        /// Cria uma nova pessoa no sistema com base nos dados fornecidos.
        /// Persiste a entidade no banco de dados.
        /// </summary>
        public async Task<PersonModel> CreatePersonAsync(CreatePersonDto personDto)
        {
            var person = new PersonModel 
            {
                Name = personDto.Name,
                Age = personDto.Age
            }; 

            _dbContext.Persons.Add(person);
            await _dbContext.SaveChangesAsync();

            return person;
        }

        /// <summary>
        /// Atualiza uma pessoa já cadastrada no sistema com base nos dados fornecidos.
        /// </summary>
        public async Task<PersonModel> UpdatePersonAsync(int id,UpdatePersonDto personDto)
        {
            //verifica se a pessoa realmente existe antes de continuar
            var person = await _dbContext.Persons.FirstOrDefaultAsync(p => p.Id == id);

            if (person == null) 
                throw new NotFoundException($"Pessoa não encontrada");

            person.Name = personDto.Name ?? person.Name;
            person.Age = personDto.Age ?? person.Age;
            _dbContext.Persons.Update(person);
            await _dbContext.SaveChangesAsync();

            return person;
        }

        /// <summary>
        /// Deleta uma pessoa já cadastrada no sistema.
        /// </summary>
        public async Task DeletePersonAsync(int id)
        {
            //verifica se a pessoa realmente existe antes de continuar
            var person = await _dbContext.Persons.FirstOrDefaultAsync(p => p.Id == id);

            if (person == null)
                throw new NotFoundException("Pessoa não encontrada");

            _dbContext.Persons.Remove(person);
            await _dbContext.SaveChangesAsync();
        }
    }
}