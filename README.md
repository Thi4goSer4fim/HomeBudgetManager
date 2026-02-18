# HomeBudgetManager

Sistema fullstack de gerenciamento financeiro residêncial desenvolvido com **React + TypeScript** no frontend e **C# com Entity Framework Core** no backend.

---

## Sobre o Projeto

O **HomeBudgetManager** é uma aplicação para controle e gastos residênciais, permitindo:

* Cadastro de Pessoas
* Cadastro de Categorias
* Registro de Transações (Receitas e Despesas)
* Dashboard com totais consolidados

O projeto foi desenvolvido com foco em organização arquitetural, separação de responsabilidades e aplicação de regras de negócio.

---

# Arquitetura do Projeto

```
HomeBudgetManager/
│
├── backend/      → ASP.NET Core Web API
├── frontend/     → React + TypeScript
├── database/     → Script SQL
└── README.md
```

---

# Backend

Desenvolvido com:

* C#
* Entity Framework Core
* MySQL
* LINQ

## Estrutura

```
Controllers/
Data/
Dto/
Enums/
Exceptions/
Interfaces/
Middlewares/
Models/
Services/
Utils/
```

### Organização

* **Controllers** → Endpoints HTTP
* **Services** → Regras de negócio
* **Data** → DbContext
* **Models** → Entidades do domínio
* **Dto** → Objetos de transferência
* **Middlewares** → Tratamento global de erros

---

# Frontend

Desenvolvido com:

* React
* TypeScript
* React Router
* Axios

## Estrutura

```
components/
layouts/
pages/
router/
services/
styles/
```

---

# Dashboard

O dashboard realiza agregações financeiras para exibir:

* Total de receitas
* Total de despesas
* Saldo geral
* Saldo por pessoa
* Total movimentado por categoria

As regras de cálculo são aplicadas no frontend com base nos dados retornados pela API.

---

# Regras de Negócio

* Cada transação pertence a uma pessoa e uma categoria.

* Transações podem ser Receita ou Despesa.

* O saldo é calculado como:

  ```
  Saldo = Total de Receitas - Total de Despesas
  ```

* Validações são aplicadas no backend antes da persistência.

---

# Banco de Dados

O projeto utiliza **MySQL**.

O script para criação do banco está disponível em:

```
database/script.sql
```

---

# Como Executar o Projeto

## Backend

Entre na pasta:

```bash
cd HomeBudgetManager_
```

Crie um arquivo:

```
appsettings.Development.json
```

Adicione sua connection string local:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;port=3306;database=HomeBudgetManager;user=root;password=root;"
  }
}
```

Execute:

```bash
dotnet restore
dotnet ef database update
dotnet run
```

---

## Frontend

Entre na pasta:

```bash
cd HomeBudgetManagerFront
```

Instale dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

---

# Objetivo Técnico

Este projeto foi desenvolvido com foco em:

* Aplicação de arquitetura em camadas
* Separação de responsabilidades
* Boas práticas em Web API
* Utilização de Entity Framework Core
* Tipagem com TypeScript
* Estrutura escalável e de fácil manutenção

# Autor

Thiago Alexandre da Silva Serafim
