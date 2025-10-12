// filepath: /Users/adamharvey/Documents/Code/Personal Dev/todos-ts/src/components/Todo.tsx
import { trpc } from '../utils/trpc';

interface TodoProps {
  _id: string;
  title: string;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function Todo({ _id, title, isComplete, createdAt, updatedAt }: TodoProps) {
  const updateTodoMutation = trpc.updateTodo.useMutation();
  const deleteTodoMutation = trpc.deleteTodo.useMutation();

  const handleEdit = () => {
    updateTodoMutation.mutate({ id: _id, title, isComplete: !isComplete });
  };

  const handleDelete = () => {
    deleteTodoMutation.mutate({ id: _id });
  };

  return (
    <>
      <div>Title: {title}</div>
      <div>Completed?: {isComplete ? 'Yes' : 'No'}</div>
      <div>Created At: {createdAt.toLocaleDateString()}</div>
      <div>Updated At: {updatedAt.toLocaleDateString()}</div>
      <div>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </>
  );
}