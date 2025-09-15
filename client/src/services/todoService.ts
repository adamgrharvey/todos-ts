import axios from 'axios';
import { 
  Todo, 
  CreateTodoRequest, 
  UpdateTodoRequest, 
  ApiResponse, 
  PaginatedResponse 
} from '@todos-ts/shared';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const todoService = {
  // Get all todos with pagination
  async getTodos(page = 1, limit = 10, completed?: boolean): Promise<PaginatedResponse<Todo>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (completed !== undefined) {
      params.append('completed', completed.toString());
    }
    
    const response = await api.get<PaginatedResponse<Todo>>(`/todos?${params}`);
    return response.data;
  },

  // Get single todo
  async getTodo(id: string): Promise<ApiResponse<Todo>> {
    const response = await api.get<ApiResponse<Todo>>(`/todos/${id}`);
    return response.data;
  },

  // Create new todo
  async createTodo(todo: CreateTodoRequest): Promise<ApiResponse<Todo>> {
    const response = await api.post<ApiResponse<Todo>>('/todos', todo);
    return response.data;
  },

  // Update todo
  async updateTodo(id: string, updates: UpdateTodoRequest): Promise<ApiResponse<Todo>> {
    const response = await api.put<ApiResponse<Todo>>(`/todos/${id}`, updates);
    return response.data;
  },

  // Delete todo
  async deleteTodo(id: string): Promise<ApiResponse> {
    const response = await api.delete<ApiResponse>(`/todos/${id}`);
    return response.data;
  },

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    const response = await api.get<ApiResponse>('/health');
    return response.data;
  },
};

export default todoService;