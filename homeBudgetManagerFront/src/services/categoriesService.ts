import api from "./api";

/**
 * Service responsável pelas operações de CRUD de categorias.
 */
class CategoriesService {
    async getCategories() {
            const response = await api.get("/api/Category");
            return response.data;
    }

    async getCategoryById(id: number) {
            const response = await api.get(`/api/Category/${id}`);
            return response.data;
    }
    
    async createCategory(data: any) {
            const response = await api.post("/api/Category", data);
            return response.data;
    }

    async updateCategory(id: number, data: any) {
            const response = await api.put(`/api/Category/${id}`, data);
            return response.data;
    }

    async deleteCategory(id: number) {
            const response = await api.delete(`/api/Category/${id}`);
            return response.data;
    }


}

export default new CategoriesService();