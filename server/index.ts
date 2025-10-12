// filepath: /Users/adamharvey/Documents/Code/Personal Dev/todos-ts/server/index.ts
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import mongoose from 'mongoose';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { appRouter } from './trpc';

const fastify = Fastify();

fastify.register(fastifyCors, {
  origin: '*',
});

mongoose.connect('mongodb://vadev:vadev@127.0.0.1:27017/todos-ts?directConnection=true&authSource=admin')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

fastify.register(fastifyTRPCPlugin, {
  prefix: '/trpc',
  trpcOptions: { router: appRouter, createContext: () => ({}) },
});

fastify.listen({ port: 3001 }, (err) => {
  if (err) console.error(err);
  console.log('Server running on http://localhost:3001');
});