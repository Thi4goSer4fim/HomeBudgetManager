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
import PersonCard from "../../components/PersonCard";
import Modal from "../../components/Modal";
import PersonForm from "../../components/PersonFormCard";

import PersonService from "../../services/personsService";


/**
 * Página responsável por listar, criar, editar e excluir pessoas.
 * Implementa busca local e operações CRUD via modal.
 */
const Persons: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

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

  const getPersons = async () => {
    setLoading(true);

    try {
      const response = await PersonService.getPersons();

      console.log("Resposta da API:", response);

      const persons = response?.data ?? [];

      setResults(Array.isArray(persons) ? persons : []);
      setNoResults(response.data.length === 0);
    } catch (error) {
      showAlert("error", "Erro ao buscar pessoas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersons();
  }, []);

  const filteredResults = results.filter((person: any) =>
    person.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Head title="Pessoas" />

      <Title>Pessoas Cadastradas</Title>

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
          placeholder="Buscar pessoa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchSection>

      <ResultsSection>
        {loading ? (
          <MessageText>Carregando pessoas...</MessageText>
        ) : noResults ? (
          <MessageText>Nenhuma pessoa encontrada.</MessageText>
        ) : (
          Array.isArray(filteredResults) &&
          filteredResults.map((person: any) => (
            <PersonCard
              key={person.id}
              person={person}
              onCardClick={() => {
                setSelectedPerson(person);
                setIsModalOpen(true);
              }}
            />
          ))
        )}
      </ResultsSection>

      <CircleButton onClick={() => setIsModalOpen(true)}>+</CircleButton>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PersonForm
          person={selectedPerson}
          onClose={() => setIsModalOpen(false)}
          onSubmit={async (data) => {
            if (data.id) {
              await PersonService.updatePerson(data.id, data);
              showAlert("success", "Pessoa atualizada com sucesso!");
            } else {
              await PersonService.createPerson(data);
              showAlert("success", "Pessoa criada com sucesso!");
            }

            setIsModalOpen(false);
            await getPersons();
          }}
          onDelete={async (id) => {
            try {
              await PersonService.deletePerson(Number(id));
              showAlert("success", "Pessoa excluída com sucesso!");

              setIsModalOpen(false);
              await getPersons();
            } catch (error) {
              showAlert("error", "Erro ao excluir pessoa.");
            }
          }}
        />
      </Modal>
    </Container>
  );
};

export default Persons;
