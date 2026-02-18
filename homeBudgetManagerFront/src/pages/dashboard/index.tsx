import React, { useState, useEffect } from "react";
import Head from "../../components/Head/Head";
import { CircleButton } from "../../components/CircleButton/style";
import TransactionModal from "../../components/TransactionForm";
import PersonsService from "../../services/personsService";
import CategoriesService from "../../services/categoriesService";
import TransactionsService from "../../services/transactionsService";
import Alert from "../../components/Alert";
import type { AlertType } from "../../components/Alert";
import {
  DashboardContainer,
  DashboardHeader,
  TotalsSection,
  TotalsTable,
  SummaryCards,
  SummaryCard,
  LoadingMessage,
  SectionTitle,
} from "./style";

// Totais agregados por pessoa
interface PersonTotals {
  personId: number;
  personName: string;
  personAge: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

// Totais agregados por categoria
interface CategoryTotals {
  categoryId: number;
  categoryDescription: string;
  categoryPurpose: number;
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

// Totais gerais do sistema
interface GeneralTotals {
  totalIncome: number;
  totalExpense: number;
  totalBalance: number;
}

const Dashboard: React.FC = () => {
  const [personTotals, setPersonTotals] = useState<PersonTotals[]>([]);
  const [categoryTotals, setCategoryTotals] = useState<CategoryTotals[]>([]);
  const [generalPersonTotals, setGeneralPersonTotals] = useState<GeneralTotals>(
    {
      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0,
    }
  );
  const [generalCategoryTotals, setGeneralCategoryTotals] =
    useState<GeneralTotals>({
      totalIncome: 0,
      totalExpense: 0,
      totalBalance: 0,
    });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  /**
   * Calcula os totais financeiros por pessoa.
   *
   * Para cada pessoa:
   * - Soma todas as receitas
   * - Soma todas as despesas
   * - Calcula o saldo final (receitas - despesas)
   */
  const calculatePersonTotals = (persons: any[], transactions: any[]) => {
    // Filtra apenas transações pertencentes à pessoa atual
    const totals: PersonTotals[] = [];
    let generalIncome = 0;
    let generalExpense = 0;

    for (const person of persons) {
      const personTransactions = transactions.filter(
        (t: any) => t.personId === person.id
      );

      let totalIncome = 0;
      let totalExpense = 0;

      personTransactions.forEach((transaction: any) => {
        if (transaction.type === 1) {
          totalIncome += transaction.value;
        } else if (transaction.type === 2) {
          totalExpense += transaction.value;
        }
      });

      const balance = totalIncome - totalExpense;

      generalIncome += totalIncome;
      generalExpense += totalExpense;

      totals.push({
        personId: person.id,
        personName: person.name,
        personAge: person.age,
        totalIncome,
        totalExpense,
        balance,
      });
    }

    setPersonTotals(totals);
    setGeneralPersonTotals({
      totalIncome: generalIncome,
      totalExpense: generalExpense,
      totalBalance: generalIncome - generalExpense,
    });
  };

  /**
   * Calcula o total movimentado por categoria,
   * independente de ser receita ou despesa.
   */
  const calculateCategoryTotals = (categories: any[], transactions: any[]) => {
    const totals: CategoryTotals[] = [];
    let generalIncome = 0;
    let generalExpense = 0;

    for (const category of categories) {
      const categoryTransactions = transactions.filter(
        (t: any) => t.categoryId === category.id
      );

      let totalIncome = 0;
      let totalExpense = 0;

      categoryTransactions.forEach((transaction: any) => {
        if (transaction.type === 1) {
          totalIncome += transaction.value;
        } else if (transaction.type === 2) {
          totalExpense += transaction.value;
        }
      });

      const balance = totalIncome - totalExpense;

      generalIncome += totalIncome;
      generalExpense += totalExpense;

      totals.push({
        categoryId: category.id,
        categoryDescription: category.description,
        categoryPurpose: category.purpose,
        totalIncome,
        totalExpense,
        balance,
      });
    }

    setCategoryTotals(totals);
    setGeneralCategoryTotals({
      totalIncome: generalIncome,
      totalExpense: generalExpense,
      totalBalance: generalIncome - generalExpense,
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [personsRes, categoriesRes, transactionsRes] = await Promise.all([
        PersonsService.getPersons(),
        CategoriesService.getCategories(),
        TransactionsService.getTransactions(),
      ]);

      const persons = personsRes?.data ?? [];
      const categories = categoriesRes?.data ?? [];
      const transactions = transactionsRes?.data ?? [];

      calculatePersonTotals(persons, transactions);
      calculateCategoryTotals(categories, transactions);
    } catch (err) {
      showAlert(
        "error",
        "Erro ao carregar dados do dashboard. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carrega os dados iniciais do dashboard:
   * - Pessoas
   * - Categorias
   * - Transações
   *
   * Após carregar, calcula os totais agregados
   * e atualiza o estado da aplicação.
   */
  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTransaction = async (data: any) => {
    console.log("Criando transação com dados:", data);
    await TransactionsService.createTransaction(data);
    showAlert("success", "Transação criada com sucesso!");
    await fetchData();
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getPurposeText = (purpose: number) => {
    switch (purpose) {
      case 1:
        return "Receita";
      case 2:
        return "Despesa";
      case 3:
        return "Ambas";
      default:
        return "-";
    }
  };

  return (
    <DashboardContainer>
      <Head title="Dashboard" />

      <DashboardHeader>
        <h1>Dashboard</h1>
        <CircleButton onClick={() => setIsModalOpen(true)}>+</CircleButton>
      </DashboardHeader>

      <Alert
        type={alert.type}
        message={alert.message}
        isVisible={alert.isVisible}
        onClose={handleCloseAlert}
        duration={5000}
      />

      {loading && <LoadingMessage>Carregando dados...</LoadingMessage>}

      {!loading && (
        <>
          {/*TOTAIS POR PESSOA */}
          <TotalsSection>
            <SectionTitle>Totais por Pessoa</SectionTitle>
            <TotalsTable>
              <thead>
                <tr>
                  <th>Pessoa</th>
                  <th>Idade</th>
                  <th>Total Receitas</th>
                  <th>Total Despesas</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {personTotals.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="empty-message">
                      Nenhuma pessoa cadastrada ou nenhuma transação encontrada
                    </td>
                  </tr>
                ) : (
                  personTotals.map((person) => (
                    <tr key={person.personId}>
                      <td>{person.personName}</td>
                      <td>{person.personAge} anos</td>
                      <td className="income">
                        {formatCurrency(person.totalIncome)}
                      </td>
                      <td className="expense">
                        {formatCurrency(person.totalExpense)}
                      </td>
                      <td
                        className={
                          person.balance >= 0 ? "positive" : "negative"
                        }
                      >
                        {formatCurrency(person.balance)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {personTotals.length > 0 && (
                <tfoot>
                  <tr>
                    <td colSpan={2}>
                      <strong>Totais Gerais (Pessoas)</strong>
                    </td>
                    <td className="income">
                      <strong>
                        {formatCurrency(generalPersonTotals.totalIncome)}
                      </strong>
                    </td>
                    <td className="expense">
                      <strong>
                        {formatCurrency(generalPersonTotals.totalExpense)}
                      </strong>
                    </td>
                    <td
                      className={
                        generalPersonTotals.totalBalance >= 0
                          ? "positive"
                          : "negative"
                      }
                    >
                      <strong>
                        {formatCurrency(generalPersonTotals.totalBalance)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              )}
            </TotalsTable>
          </TotalsSection>

          {/* TOTAIS POR CATEGORIA */}
          <TotalsSection>
            <SectionTitle>Totais por Categoria</SectionTitle>
            <TotalsTable>
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Finalidade</th>
                  <th>Total Receitas</th>
                  <th>Total Despesas</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {categoryTotals.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="empty-message">
                      Nenhuma categoria cadastrada ou nenhuma transação
                      encontrada
                    </td>
                  </tr>
                ) : (
                  categoryTotals.map((category) => (
                    <tr key={category.categoryId}>
                      <td>{category.categoryDescription}</td>
                      <td>{getPurposeText(category.categoryPurpose)}</td>
                      <td className="income">
                        {formatCurrency(category.totalIncome)}
                      </td>
                      <td className="expense">
                        {formatCurrency(category.totalExpense)}
                      </td>
                      <td
                        className={
                          category.balance >= 0 ? "positive" : "negative"
                        }
                      >
                        {formatCurrency(category.balance)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              {categoryTotals.length > 0 && (
                <tfoot>
                  <tr>
                    <td colSpan={2}>
                      <strong>Totais Gerais (Categorias)</strong>
                    </td>
                    <td className="income">
                      <strong>
                        {formatCurrency(generalCategoryTotals.totalIncome)}
                      </strong>
                    </td>
                    <td className="expense">
                      <strong>
                        {formatCurrency(generalCategoryTotals.totalExpense)}
                      </strong>
                    </td>
                    <td
                      className={
                        generalCategoryTotals.totalBalance >= 0
                          ? "positive"
                          : "negative"
                      }
                    >
                      <strong>
                        {formatCurrency(generalCategoryTotals.totalBalance)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              )}
            </TotalsTable>
          </TotalsSection>

          {/* RESUMO */}
          <SummaryCards>
            <SummaryCard type="income">
              <h3>Total Receitas</h3>
              <p>{formatCurrency(generalPersonTotals.totalIncome)}</p>
            </SummaryCard>
            <SummaryCard type="expense">
              <h3>Total Despesas</h3>
              <p>{formatCurrency(generalPersonTotals.totalExpense)}</p>
            </SummaryCard>
            <SummaryCard
              type={
                generalPersonTotals.totalBalance >= 0 ? "positive" : "negative"
              }
            >
              <h3>Saldo Líquido</h3>
              <p>{formatCurrency(generalPersonTotals.totalBalance)}</p>
            </SummaryCard>
          </SummaryCards>
        </>
      )}

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTransaction}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
