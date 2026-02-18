using System.ComponentModel.DataAnnotations;

namespace HomeBudgetManager_.Dto.Person
{
    /// <summary>
    /// Representa os dados necessários para a criação
    /// de uma nova pessoa.
    /// </summary>
    public class CreatePersonDto
    {
        [Required(ErrorMessage = "O nome é obrigatório para o cadastro de uma pessoa")]
        [StringLength(200, ErrorMessage = "O nome não deve ultrapassar 200 caracteres")]
        [MinLength(2, ErrorMessage = "O nome deve conter pelo menos 2 caracteres")]
        public string Name { get; set; }

        [Required(ErrorMessage = "A idade é obrigatória para o cadastro de uma pessoa")]
        [Range(0, 150, ErrorMessage = "A idade deve ser um valor entre 0 e 150")]
        public int Age { get; set; }
    }
}
