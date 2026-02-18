using Microsoft.EntityFrameworkCore;

namespace HomeBudgetManager_.Data
{
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Representa o contexto de banco de dados da aplicação.
        /// Responsável por estabelecer a comunicação com o banco,
        /// mapear as entidades e gerenciar operações de leitura e escrita.
        /// </summary>
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Models.TransactionModel> Transactions { get; set; }
        public DbSet<Models.CategoryModel> Category { get; set; }
        public DbSet<Models.PersonModel> Persons { get; set; }
    }
}
