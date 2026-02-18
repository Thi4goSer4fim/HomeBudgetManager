import React, { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  ErrorMessage,
  CancelButton,
  SaveButton,
} from "./style";
import CategoriesService from "../../services/categoriesService";
import PersonsService from "../../services/personsService";
import Alert from "../Alert";
import type { AlertType } from "../Alert";

/**
 * Modal responsável por criação de transações.
 * Aplica regras de validação baseadas em:
 * - Tipo da transação
 * - Idade da pessoa
 * - Finalidade da categoria
 */
interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    description: "",
    value: "",
    type: 2,
    categoryId: "",
    personId: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [persons, setPersons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [alert, setAlert] = useState<{
    isVisible: boolean;
    type: AlertType;
    message: string;
  }>({
    isVisible: false,
    type: "info",
    message: "",
  });

  const showAlert = (type: AlertType, message: string) => {
    setAlert({ isVisible: true, type, message });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  };

  // Carrega categorias e pessoas quando o modal abre
  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  // Reseta o formulário quando o modal fecha
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        description: "",
        value: "",
        type: 2,
        categoryId: "",
        personId: "",
      });
      setErrors({});
    }
  }, [isOpen]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, personsRes] = await Promise.all([
        CategoriesService.getCategories(),
        PersonsService.getPersons(),
      ]);

      setCategories(categoriesRes?.data ?? []);
      setPersons(personsRes?.data ?? []);
    } catch (error) {
      showAlert("error", "Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Verifica se a pessoa selecionada é menor de idade
  const isSelectedPersonUnderage = () => {
    if (!formData.personId) return false;
    const selectedPerson = persons.find(
      (p) => p.id === Number(formData.personId)
    );
    return selectedPerson ? selectedPerson.age < 18 : false;
  };

  // Filtra categorias baseado no tipo de transação e finalidade
  const filteredCategories = categories.filter((category) => {
    const purpose = Number(category.purpose);
    const isUnderage = isSelectedPersonUnderage();

    if (isUnderage) {
      return purpose === 2;
    }

    if (Number(formData.type) === 1) {
      return purpose === 1 || purpose === 3;
    } else {
      return purpose === 2 || purpose === 3;
    }
  });

  // Valida se a pessoa é menor de idade (menores de idade só podem registrar despesas)
  const validatePersonAge = (personId: number, type: number) => {
    const selectedPerson = persons.find((p) => p.id === personId);
    if (selectedPerson && selectedPerson.age < 18 && type === 1) {
      return "Menores de idade só podem registrar despesas";
    }
    return null;
  };

  const validateCategoryForUnderage = (
    personId: number,
    categoryId: number
  ) => {
    const selectedPerson = persons.find((p) => p.id === personId);
    if (!selectedPerson || selectedPerson.age >= 18) return null;

    const selectedCategory = categories.find((c) => c.id === categoryId);
    if (selectedCategory && selectedCategory.purpose !== 2) {
      return "Menores de idade só podem usar categorias de despesa";
    }
    return null;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    } else if (formData.description.length > 400) {
      newErrors.description = "Máximo de 400 caracteres";
    }

    if (!formData.value) {
      newErrors.value = "Valor é obrigatório";
    } else {
      const value = parseFloat(formData.value);
      if (isNaN(value) || value <= 0) {
        newErrors.value = "Valor deve ser um número positivo";
      }
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Categoria é obrigatória";
    }

    if (!formData.personId) {
      newErrors.personId = "Pessoa é obrigatória";
    } else {
      const ageError = validatePersonAge(
        Number(formData.personId),
        formData.type
      );
      if (ageError) {
        newErrors.personId = ageError;
      }

      // Valida se a categoria é permitida para menor de idade
      if (formData.categoryId) {
        const categoryError = validateCategoryForUnderage(
          Number(formData.personId),
          Number(formData.categoryId)
        );
        if (categoryError) {
          newErrors.categoryId = categoryError;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setSubmitting(true);
  try {
    const dataToSend = {
      description: formData.description,
      value: parseFloat(formData.value),
      type: Number(formData.type), 
      categoryId: Number(formData.categoryId), 
      personId: Number(formData.personId), 
    };

    await onSubmit(dataToSend);

    showAlert("success", "Transação criada com sucesso!");

    setTimeout(() => {
      onClose();
    }, 1500);
  } catch (error: any) {
    showAlert("error", error.message || "Erro ao criar transação");
  } finally {
    setSubmitting(false);
  }
};
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // Se mudar a pessoa e ela for menor de idade, força o tipo para despesa
    if (name === "personId" && value) {
      const selectedPerson = persons.find((p) => p.id === Number(value));
      if (selectedPerson && selectedPerson.age < 18) {
        setFormData((prev) => ({
          ...prev,
          personId: value,
          type: 2, 
          categoryId: "", // limpa categoria pois pode ser incompativel
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "personId" || name === "type" || name === "categoryId") {
      const personId =
        name === "personId" ? Number(value) : Number(formData.personId);
      const type = name === "type" ? Number(value) : formData.type;
      const categoryId =
        name === "categoryId" ? Number(value) : Number(formData.categoryId);

      if (personId && type === 1) {
        const ageError = validatePersonAge(personId, type);
        if (ageError) {
          setErrors((prev) => ({ ...prev, personId: ageError }));
        }
      }

      if (personId && categoryId) {
        const categoryError = validateCategoryForUnderage(personId, categoryId);
        if (categoryError) {
          setErrors((prev) => ({ ...prev, categoryId: categoryError }));
        }
      }
    }
  };

  //traduzir finalidade para texto
  const getPurposeText = (purpose: number) => {
    switch (purpose) {
      case 1:
        return " (Receita)";
      case 2:
        return " (Despesa)";
      case 3:
        return " (Ambas)";
      default:
        return "";
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>Nova Transação</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <Alert
          type={alert.type}
          message={alert.message}
          isVisible={alert.isVisible}
          onClose={handleCloseAlert}
          duration={3000}
        />

        <form onSubmit={handleSubmit}>
          <ModalBody>
            {loading ? (
              <div
                style={{ textAlign: "center", padding: "40px", color: "#666" }}
              >
                Carregando dados...
              </div>
            ) : (
              <>
                <FormGroup>
                  <Label>Descrição *</Label>
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva a transação"
                    maxLength={400}
                    error={!!errors.description}
                  />
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {errors.description && (
                      <ErrorMessage>{errors.description}</ErrorMessage>
                    )}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        marginLeft: "auto",
                      }}
                    >
                      {formData.description.length}/400
                    </span>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label>Valor (R$) *</Label>
                  <Input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    placeholder="0,00"
                    step="0.01"
                    min="0.01"
                    error={!!errors.value}
                  />
                  {errors.value && <ErrorMessage>{errors.value}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>Tipo *</Label>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    error={!!errors.type}
                    disabled={isSelectedPersonUnderage()}
                  >
                    <option value={1}>Receita</option>
                    <option value={2}>Despesa</option>
                  </Select>
                  {errors.type && <ErrorMessage>{errors.type}</ErrorMessage>}
                  {isSelectedPersonUnderage() && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      Menores de idade só podem registrar despesas
                    </span>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Categoria *</Label>
                  <Select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    error={!!errors.categoryId}
                  >
                    <option value="">Selecione uma categoria</option>
                    {filteredCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.description}
                        {getPurposeText(category.purpose)}
                      </option>
                    ))}
                  </Select>
                  {errors.categoryId && (
                    <ErrorMessage>{errors.categoryId}</ErrorMessage>
                  )}
                  {isSelectedPersonUnderage() &&
                    filteredCategories.length === 0 && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#d32f2f",
                          marginTop: "4px",
                          display: "block",
                        }}
                      >
                        Não há categorias de despesa disponíveis
                      </span>
                    )}
                </FormGroup>

                <FormGroup>
                  <Label>Pessoa *</Label>
                  <Select
                    name="personId"
                    value={formData.personId}
                    onChange={handleChange}
                    error={!!errors.personId}
                  >
                    <option value="">Selecione uma pessoa</option>
                    {persons.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name} ({person.age} anos){" "}
                        {person.age < 18 ? "- Menor de idade" : ""}
                      </option>
                    ))}
                  </Select>
                  {errors.personId && (
                    <ErrorMessage>{errors.personId}</ErrorMessage>
                  )}
                </FormGroup>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>
            <SaveButton type="submit" disabled={loading || submitting}>
              {submitting ? "Salvando..." : "Salvar"}
            </SaveButton>
          </ModalFooter>
        </form>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default TransactionModal;
