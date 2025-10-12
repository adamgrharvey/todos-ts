// filepath: /Users/adamharvey/Documents/Code/Personal Dev/todos-ts/src/App.tsx
import { useState } from 'react';
import TodoComponent from './components/Todo';
import { Todo } from './types/Todo';
import { trpc } from './utils/trpc';

function App() {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const { data: todosState, refetch } = trpc.getTodos.useQuery();
  const createTodoMutation = trpc.createTodo.useMutation({
    onSuccess: () => refetch(),
  });

  const handleCreateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;
    createTodoMutation.mutate({ title: newTodoTitle.trim() });
    setNewTodoTitle('');
  };

  return (
    <div>
      <h1>Todos App</h1>
      <form onSubmit={handleCreateTodo} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      {(todosState as Todo[])?.map((todo) => (
        <TodoComponent
          key={todo._id}
          _id={todo._id}
          title={todo.title}
          isComplete={todo.isComplete}
          createdAt={new Date(todo.createdAt)}
          updatedAt={new Date(todo.updatedAt)}
        />
      ))}
      <div>{todosState?.length} todos</div>
    </div>
  );
}

export default App;