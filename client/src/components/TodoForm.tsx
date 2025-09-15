import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string, description?: string) => Promise<void>;
  loading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, loading = false }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await onSubmit(title.trim(), description.trim() || undefined);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          required
          disabled={loading}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description (optional)..."
          rows={3}
          disabled={loading}
          className="form-textarea"
        />
      </div>
      <button 
        type="submit" 
        disabled={!title.trim() || loading}
        className="btn btn-primary"
      >
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};