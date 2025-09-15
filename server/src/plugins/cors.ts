import { FastifyPluginAsync } from 'fastify';

const corsPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(require('@fastify/cors'), {
    origin: (origin: string | undefined, cb: (err: Error | null, allow: boolean) => void) => {
      // Allow requests from localhost during development
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        cb(null, true);
        return;
      }
      
      // In production, add your frontend domain here
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:3000',
        'http://127.0.0.1:5173'
      ];
      
      if (allowedOrigins.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
  });
};

export default corsPlugin;