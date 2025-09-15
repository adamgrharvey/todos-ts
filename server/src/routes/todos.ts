import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { TodoModel } from '../models/todo';
import { 
  CreateTodoRequest, 
  UpdateTodoRequest, 
  ApiResponse, 
  PaginatedResponse,
  HTTP_STATUS 
} from '@todos-ts/shared';

interface TodoParams {
  id: string;
}

interface TodoQuery {
  page?: number;
  limit?: number;
  completed?: boolean;
}

const todoRoutes: FastifyPluginAsync = async (fastify) => {
  // Get all todos with pagination
  fastify.get<{ Querystring: TodoQuery }>('/todos', async (request, reply) => {
    try {
      const { page = 1, limit = 10, completed } = request.query;
      const skip = (page - 1) * limit;
      
      const filter: any = {};
      if (completed !== undefined) {
        filter.completed = completed;
      }
      
      const [todos, total] = await Promise.all([
        TodoModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
        TodoModel.countDocuments(filter)
      ]);
      
      const response: PaginatedResponse<any> = {
        success: true,
        data: todos,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
      
      reply.status(HTTP_STATUS.OK).send(response);
    } catch (error) {
      fastify.log.error(error);
      reply.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: 'Failed to fetch todos'
      });
    }
  });

  // Get single todo
  fastify.get<{ Params: TodoParams }>('/todos/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const todo = await TodoModel.findById(id);
      
      if (!todo) {
        reply.status(HTTP_STATUS.NOT_FOUND).send({
          success: false,
          error: 'Todo not found'
        });
        return;
      }
      
      const response: ApiResponse = {
        success: true,
        data: todo
      };
      
      reply.status(HTTP_STATUS.OK).send(response);
    } catch (error) {
      fastify.log.error(error);
      reply.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: 'Failed to fetch todo'
      });
    }
  });

  // Create new todo
  fastify.post<{ Body: CreateTodoRequest }>('/todos', async (request, reply) => {
    try {
      const { title, description } = request.body;
      
      if (!title || title.trim().length === 0) {
        reply.status(HTTP_STATUS.BAD_REQUEST).send({
          success: false,
          error: 'Title is required'
        });
        return;
      }
      
      const todo = new TodoModel({
        title: title.trim(),
        description: description?.trim()
      });
      
      await todo.save();
      
      const response: ApiResponse = {
        success: true,
        data: todo,
        message: 'Todo created successfully'
      };
      
      reply.status(HTTP_STATUS.CREATED).send(response);
    } catch (error) {
      fastify.log.error(error);
      reply.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: 'Failed to create todo'
      });
    }
  });

  // Update todo
  fastify.put<{ Params: TodoParams; Body: UpdateTodoRequest }>('/todos/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const updates = request.body;
      
      const todo = await TodoModel.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!todo) {
        reply.status(HTTP_STATUS.NOT_FOUND).send({
          success: false,
          error: 'Todo not found'
        });
        return;
      }
      
      const response: ApiResponse = {
        success: true,
        data: todo,
        message: 'Todo updated successfully'
      };
      
      reply.status(HTTP_STATUS.OK).send(response);
    } catch (error) {
      fastify.log.error(error);
      reply.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: 'Failed to update todo'
      });
    }
  });

  // Delete todo
  fastify.delete<{ Params: TodoParams }>('/todos/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const todo = await TodoModel.findByIdAndDelete(id);
      
      if (!todo) {
        reply.status(HTTP_STATUS.NOT_FOUND).send({
          success: false,
          error: 'Todo not found'
        });
        return;
      }
      
      const response: ApiResponse = {
        success: true,
        message: 'Todo deleted successfully'
      };
      
      reply.status(HTTP_STATUS.OK).send(response);
    } catch (error) {
      fastify.log.error(error);
      reply.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: 'Failed to delete todo'
      });
    }
  });

  // Health check
  fastify.get('/health', async (request, reply) => {
    reply.status(HTTP_STATUS.OK).send({
      success: true,
      message: 'Server is running',
      timestamp: new Date().toISOString()
    });
  });
};

export default todoRoutes;