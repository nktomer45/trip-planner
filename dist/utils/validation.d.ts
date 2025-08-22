import { FastifyRequest, FastifyReply } from 'fastify';
import { ZodSchema } from 'zod';
export declare const validateBody: <T>(schema: ZodSchema<T>) => (request: FastifyRequest, reply: FastifyReply, done: () => void) => void;
export declare const validateParams: <T>(schema: ZodSchema<T>) => (request: FastifyRequest, reply: FastifyReply, done: () => void) => void;
export declare const validateQuery: <T>(schema: ZodSchema<T>) => (request: FastifyRequest, reply: FastifyReply, done: () => void) => void;
//# sourceMappingURL=validation.d.ts.map