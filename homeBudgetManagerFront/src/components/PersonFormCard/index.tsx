import React, { useState, useEffect } from "react";
import {
  FormContainer,
  Title,
  InputGroup,
  Label,
  Input,
  ButtonGroup,
  PrimaryButton,
  DangerButton,
  GhostButton,
} from "./style";

/**
 * Formulário responsável por criar ou editar uma pessoa.
 * Suporta exclusão quando utilizado no modo de edição.
 */
interface PersonFormProps {
  person?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
  onDelete?: (id: string) => void;
}

const PersonForm: React.FC<PersonFormProps> = ({
  person,
  onClose,
  onSubmit,
  onDelete,
}) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

    // Preenche os campos quando uma pessoa é enviada para edição
  useEffect(() => {
    if (person) {
      setName(person.name);
      setAge(person.age);
    }
  }, [person]);

  
    // Monta o payload e envia os dados para o componente pai
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: person?.id,
      name,
      age,
    };

    onSubmit(payload);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>{person ? "Editar Pessoa" : "Nova Pessoa"}</Title>

      <InputGroup>
        <Label>Nome</Label>
        <Input
          type="text"
          placeholder="Digite o nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </InputGroup>

      <InputGroup>
        <Label>Idade</Label>
        <Input
          type="number"
          placeholder="Digite a idade"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          required
        />
      </InputGroup>

      <ButtonGroup>
        <GhostButton type="button" onClick={onClose}>
          Cancelar
        </GhostButton>

        {person && onDelete && (
          <DangerButton type="button" onClick={() => onDelete(person.id)}>
            Excluir
          </DangerButton>
        )}

        <PrimaryButton type="submit">
          {person ? "Atualizar" : "Criar"}
        </PrimaryButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default PersonForm;
