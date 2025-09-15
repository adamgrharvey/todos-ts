import Fastify from 'fastify';
import dotenv from 'dotenv';
import corsPlugin from './plugins/cors';
import databasePlugin from './plugins/database';
import todoRoutes from './routes/todos';

// Load environment variables
dotenv.config();

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: process.env.NODE_ENV === 'development' ? {
      target: 'pino-pretty'
    } : undefined
  }
});

async function start(): Promise<void> {
  try {
    // Register plugins
    await fastify.register(corsPlugin);
    await fastify.register(databasePlugin);
    
    // Register routes
    await fastify.register(todoRoutes, { prefix: '/api' });
    
    // Start server
    const port = Number(process.env.PORT) || 3001;
    const host = process.env.HOST || '0.0.0.0';
    
    await fastify.listen({ port, host });
    fastify.log.info(`Server running on http://${host}:${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  fastify.log.info('Received SIGINT, shutting down gracefully');
  await fastify.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  fastify.log.info('Received SIGTERM, shutting down gracefully');
  await fastify.close();
  process.exit(0);
});

start();