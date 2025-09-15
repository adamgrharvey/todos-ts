import { FastifyPluginAsync } from 'fastify';
import mongoose from 'mongoose';

const databasePlugin: FastifyPluginAsync = async (fastify) => {
  const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/todos-ts';
  
  try {
    await mongoose.connect(mongoUrl);
    fastify.log.info('Connected to MongoDB');
    
    // Graceful shutdown
    fastify.addHook('onClose', async () => {
      await mongoose.connection.close();
      fastify.log.info('MongoDB connection closed');
    });
  } catch (error: any) {
    fastify.log.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

export default databasePlugin;