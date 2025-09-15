import React from 'react';
import { Todo } from '@todos-ts/shared';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="todo-checkbox"
          />
          <h3 className={`todo-title ${todo.completed ? 'line-through' : ''}`}>
            {todo.title}
          </h3>
        </div>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-meta">
          <span className="todo-date">
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </span>
          {todo.updatedAt !== todo.createdAt && (
            <span className="todo-date">
              Updated: {new Date(todo.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      <div className="todo-actions">
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
          title="Delete todo"
        >
          Delete
        </button>
      </div>
    </div>
  );
};