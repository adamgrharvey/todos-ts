import { useState, useEffect, useCallback } from 'react';
import { Todo, PaginatedResponse } from '@todos-ts/shared';
import { todoService } from '../services/todoService';

interface UseTodosOptions {
  page?: number;
  limit?: number;
  completed?: boolean;
}

interface UseTodosReturn {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  pagination: PaginatedResponse<Todo>['pagination'] | null;
  refetch: () => Promise<void>;
  createTodo: (title: string, description?: string) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
}

export const useTodos = (options: UseTodosOptions = {}): UseTodosReturn => {
  const { page = 1, limit = 10, completed } = options;
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginatedResponse<Todo>['pagination'] | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getTodos(page, limit, completed);
      
      if (response.success && response.data) {
        setTodos(response.data);
        setPagination(response.pagination);
      } else {
        setError(response.error || 'Failed to fetch todos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, limit, completed]);

  const createTodo = useCallback(async (title: string, description?: string) => {
    try {
      setError(null);
      const response = await todoService.createTodo({ title, description });
      
      if (response.success) {
        await fetchTodos(); // Refresh the list
      } else {
        setError(response.error || 'Failed to create todo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
    }
  }, [fetchTodos]);

  const updateTodo = useCallback(async (id: string, updates: Partial<Todo>) => {
    try {
      setError(null);
      const response = await todoService.updateTodo(id, updates);
      
      if (response.success) {
        setTodos(prevTodos => 
          prevTodos.map(todo => 
            todo.id === id ? { ...todo, ...updates } : todo
          )
        );
      } else {
        setError(response.error || 'Failed to update todo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      setError(null);
      const response = await todoService.deleteTodo(id);
      
      if (response.success) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      } else {
        setError(response.error || 'Failed to delete todo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  }, []);

  const toggleTodo = useCallback(async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  }, [todos, updateTodo]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    error,
    pagination,
    refetch: fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
};