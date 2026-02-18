import axios from "axios";

/**
 * Instância central do Axios utilizada para comunicação com a api.
 * A url base é definida via variável de ambiente.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, 
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;