import React, { useState, useEffect } from "react";
import {
  FormContainer,
  Title,
  InputGroup,
  Label,
  Input,
  Select,
  ButtonGroup,
  PrimaryButton,
  DangerButton,
  GhostButton,
} from "./style";


/**
 * Formulário responsável por criar ou editar uma categoria.
 * Suporta exclusão quando utilizado no modo de edição.
 */
interface CategoryFormProps {
  Category?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete?: (id: number) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  Category,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState(0);

  // Preenche os campos quando uma categoria é enviada para edição
  useEffect(() => {
    if (Category) {
      setDescription(Category.description ?? "");
      setPurpose(Number(Category.purpose) ?? 0);
    } else {
      setDescription("");
      setPurpose(0);
    }
  }, [Category]);

  // Monta o payload e envia os dados para o componente pai
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: Category?.id,
      description,
      purpose,
    };

    onSubmit(payload);
  };

  // Mapeia o código da finalidade para descrição exibida no select
  const CategoryPurpose: Record<string, string> = {
    "1": "Receita",
    "2": "Despesa",
    "3": "Receita e Despesa",
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>{Category ? "Editar Categoria" : "Nova Categoria"}</Title>

      <InputGroup>
        <Label>Nome</Label>
        <Input
          type="text"
          placeholder="Digite a descrição da categoria"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label>Finalidade</Label>

        <Select
          value={purpose}
          onChange={(e) => setPurpose(Number(e.target.value))}
          required
        >
          <option value={0}>Selecione uma finalidade</option>
          {Object.entries(CategoryPurpose).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Select>
      </InputGroup>

      <ButtonGroup>
        <GhostButton type="button" onClick={onClose}>
          Cancelar
        </GhostButton>

        {Category && onDelete && (
          <DangerButton type="button" onClick={() => onDelete(Category.id)}>
            Excluir
          </DangerButton>
        )}

        <PrimaryButton type="submit">
          {Category ? "Atualizar" : "Criar"}
        </PrimaryButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default CategoryForm;
