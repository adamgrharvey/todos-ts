// filepath: /Users/adamharvey/Documents/Code/Personal Dev/todos-ts/server/trpc.ts
import { initTRPC } from '@trpc/server';
import { Todo } from './models/Todo';

const t = initTRPC.create();

export const appRouter = t.router({
  getTodos: t.procedure.query(async () => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      return todos;
    } catch (error) {
      throw new Error('Failed to fetch todos');
    }
  }),
  createTodo: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'object' && val !== null && 'title' in val && typeof val.title === 'string') {
        return { title: val.title };
      }
      throw new Error('Invalid input');
    })
    .mutation(async ({ input }) => {
      try {
        const todo = new Todo({ title: input.title });
        await todo.save();
        return todo;
      } catch (error) {
        throw new Error('Failed to create todo');
      }
    }),
  updateTodo: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'object' && val !== null && 'id' in val && typeof val.id === 'string') {
        return {
          id: val.id,
          title: 'title' in val && typeof val.title === 'string' ? val.title : undefined,
          isComplete: 'isComplete' in val && typeof val.isComplete === 'boolean' ? val.isComplete : undefined,
        };
      }
      throw new Error('Invalid input');
    })
    .mutation(async ({ input }) => {
      try {
        const todo = await Todo.findOne({ _id: input.id });
        if (!todo) throw new Error('Todo not found');
        if (input.title !== undefined) todo.title = input.title;
        if (input.isComplete !== undefined) todo.isComplete = input.isComplete;
        await todo.save();
        return todo;
      } catch (error) {
        throw new Error('Failed to update todo');
      }
    }),
  deleteTodo: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'object' && val !== null && 'id' in val && typeof val.id === 'string') {
        return { id: val.id };
      }
      throw new Error('Invalid input');
    })
    .mutation(async ({ input }) => {
      try {
        const todo = await Todo.findOneAndDelete({ _id: input.id });
        if (!todo) throw new Error('Todo not found');
        return { message: 'Todo deleted' };
      } catch (error) {
        throw new Error('Failed to delete todo');
      }
    }),
});

export type AppRouter = typeof appRouter;