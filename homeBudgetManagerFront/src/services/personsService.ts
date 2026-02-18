import api from "./api";

/**
 * Service responsável pelas operações de CRUD de pessoas.
 * Centraliza chamadas relacionadas ao recurso Person.
 */
class PersonsService {
    async getPersons() {
            const response = await api.get("/api/Person");
            return response.data;
    }

    async getPersonById(id: number) {
            const response = await api.get(`/api/Person/${id}`);
            return response.data;
    }

    async getPersonByName(name: string) {
            const response = await api.get(`/api/Person/Search/${name}`);
            return response.data;
    }
    
    async createPerson(data: any) {
            const response = await api.post("/api/Person", data);
            return response.data;
    }

    async updatePerson(id: number, data: any) {
            const response = await api.put(`/api/Person/${id}`, data);
            return response.data;
    }

    async deletePerson(id: number) {
            const response = await api.delete(`/api/Person/${id}`);
            return response.data;
    }
}

export default new PersonsService();