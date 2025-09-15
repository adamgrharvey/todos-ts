import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const {
    todos,
    loading,
    error,
    pagination,
    createTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todos TS</h1>
        <p>A TypeScript monorepo with React + Fastify + MongoDB</p>
      </header>

      <main className="app-main">
        <section className="todo-form-section">
          <h2>Add New Todo</h2>
          <TodoForm onSubmit={createTodo} loading={loading} />
        </section>

        <section className="todo-list-section">
          <div className="section-header">
            <h2>Your Todos</h2>
            {pagination && (
              <span className="todo-count">
                {pagination.total} todo{pagination.total !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          <TodoList
            todos={todos}
            loading={loading}
            error={error}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>
      </main>
    </div>
  );
}

export default App;