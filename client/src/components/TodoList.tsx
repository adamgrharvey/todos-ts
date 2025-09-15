import React from 'react';
import { Todo } from '@todos-ts/shared';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  loading, 
  error, 
  onToggle, 
  onDelete 
}) => {
  if (loading) {
    return <div className="loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (todos.length === 0) {
    return <div className="empty-state">No todos yet. Create your first todo!</div>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};