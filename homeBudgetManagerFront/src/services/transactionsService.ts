import api from "./api";

/**
 * Service responsável pelas operações de transações.
 * Inclui CRUD e consultas agregadas como totais por pessoa e categoria.
 */
class TransactionsService {
    async getTransactions() {
            const response = await api.get("/api/Transaction");
            return response.data;
    }

    async getTransactionById(id: number) {
            const response = await api.get(`/api/Transaction/${id}`);
            return response.data;
    }
    
    async createTransaction(data: any) {
            const response = await api.post("/api/Transaction", data);
            return response.data;
    }

    async updateTransaction(id: number, data: any) {
            const response = await api.put(`/api/Transaction/${id}`, data);
            return response.data;
    }

    async deleteTransaction(id: number) {
            const response = await api.delete(`/api/Transaction/${id}`);
            return response.data;
    }

    async getTransactionsByPersonId(personId: number) {
            const response = await api.get(`/api/Transaction/person/${personId}`);
            return response.data;
    }

    async getTransactionsByCategoryId(categoryId: number) {
            const response = await api.get(`/api/Transaction/category/${categoryId}`);
            return response.data;
    }

    async getTotalTransactionsAmount() {
            const response = await api.get("/api/Transaction/totals");
            return response.data;
    }

    async getTotalTransactionsPerPerson(personId: number) {
            const response = await api.get(`/api/Transaction/totals/person/${personId}`);
            return response.data;
    }

    async getTotalTransactionsPerCategory(categoryId: number) {
            const response = await api.get(`/api/Transaction/totals/category/${categoryId}`);
            return response.data;
    }
}

export default new TransactionsService();