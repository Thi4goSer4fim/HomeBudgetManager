import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  SearchSection,
  SearchInput,
  ResultsSection,
  MessageText,
} from "./style";

import Head from "../../components/Head/Head";
import Alert from "../../components/Alert";
import type { AlertType } from "../../components/Alert";
import { CircleButton } from "../../components/CircleButton/style";
import CategoryCard from "../../components/CategoryCard";

import Modal from "../../components/Modal";
import CategoryForm from "../../components/CategoryFormCard";

import CategoriesService from "../../services/categoriesService";

/**
 * Página responsável por listar, criar, editar e excluir categorias.
 * Implementa busca local e operações CRUD via modal.
 */

const Categories: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

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
    setAlert({
      isVisible: true,
      type,
      message,
    });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, isVisible: false }));
  };

  const getCategories = async () => {
    setLoading(true);

    try {
      const response = await CategoriesService.getCategories();

      console.log("Resposta da API:", response);

      const categories = response?.data ?? [];

      setResults(Array.isArray(categories) ? categories : []);
      setNoResults(response.data.length === 0);
    } catch (error) {
      showAlert("error", "Erro ao buscar categorias. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);


  const filteredResults = results.filter((category: any) =>
    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Head title="Categorias" />

      <Title>Categorias Cadastradas</Title>

      <Alert
        type={alert.type}
        message={alert.message}
        isVisible={alert.isVisible}
        onClose={handleCloseAlert}
        duration={5000}
      />

      <SearchSection>
        <SearchInput
          type="search"
          placeholder="Buscar categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchSection>

      <ResultsSection>
        {loading ? (
          <MessageText>Carregando categorias...</MessageText>
        ) : noResults ? (
          <MessageText>Nenhuma categoria encontrada.</MessageText>
        ) : (
          Array.isArray(filteredResults) &&
          filteredResults.map((category: any) => (
            <CategoryCard
              key={category.id}
              category={category}
              onCardClick={(category) => {
                setSelectedCategory(category);
                setIsModalOpen(true);
              }}
            />
          ))
        )}
      </ResultsSection>

      <CircleButton
        onClick={() => {
          setSelectedCategory(null);
          setIsModalOpen(true);
        }}
      >
        +
      </CircleButton>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CategoryForm
          Category={selectedCategory}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
          onSubmit={async (data) => {
            if (data.id) {
              await CategoriesService.updateCategory(data.id, data);
              showAlert("success", "Categoria atualizada com sucesso!");
            } else {
              await CategoriesService.createCategory(data);
              showAlert("success", "Categoria criada com sucesso!");
            }

            setIsModalOpen(false);
            await getCategories();
          }}
          onDelete={async (id) => {
            try {
              await CategoriesService.deleteCategory(id);
              showAlert("success", "Categoria excluída com sucesso!");

              setIsModalOpen(false);
              await getCategories();
            } catch (error) {
              showAlert("error", "Erro ao excluir categoria.");
            }
          }}
        />
      </Modal>
    </Container>
  );
};

export default Categories;
