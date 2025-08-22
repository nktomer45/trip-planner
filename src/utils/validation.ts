import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodSchema, ZodError } from 'zod';

export const validateBody = <T>(schema: ZodSchema<T>) => {
  return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    try {
      const result = schema.parse(request.body);
      (request as any).validatedBody = result;
      done();
    } catch (error) {
      if (error instanceof ZodError) {
        reply.code(400).send({
          error: 'Validation failed',
          details: error.issues
        });
      } else {
        reply.code(400).send({ error: 'Invalid request body' });
      }
    }
  };
};

export const validateParams = <T>(schema: ZodSchema<T>) => {
  return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    try {
      const result = schema.parse(request.params);
      (request as any).validatedParams = result;
      done();
    } catch (error) {
      if (error instanceof ZodError) {
        reply.code(400).send({
          error: 'Invalid parameters',
          details: error.issues
        });
      } else {
        reply.code(400).send({ error: 'Invalid request parameters' });
      }
    }
  };
};

export const validateQuery = <T>(schema: ZodSchema<T>) => {
  return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
    try {
      const result = schema.parse(request.query);
      (request as any).validatedQuery = result;
      done();
    } catch (error) {
      if (error instanceof ZodError) {
        reply.code(400).send({
          error: 'Invalid query parameters',
          details: error.issues
        });
      } else {
        reply.code(400).send({ error: 'Invalid query parameters' });
      }
    }
  };
};