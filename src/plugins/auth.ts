import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { verifyToken } from '../utils/auth';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      userId: string;
      username: string;
    };
  }
}

const authPlugin: FastifyPluginAsync = async (fastify) => {
  // fastify.decorateRequest('user', null);

  // fastify.addHook('preHandler', async (request: FastifyRequest, reply) => {
  //   // Skip auth for login endpoint and health check
  //   if (request.url === '/api/auth/login' || request.url === '/health' || request.method === 'OPTIONS') {
  //     return;
  //   }

  //   // Only protect /api/trips routes
  //   if (!request.url.startsWith('/api/trips')) {
  //     return;
  //   }

  //   const authHeader = request.headers.authorization;
  //   if (!authHeader?.startsWith('Bearer ')) {
  //     return reply.code(401).send({ error: 'Missing or invalid authorization header' });
  //   }

  //   const token = authHeader.substring(7);
  //   const decoded = verifyToken(token);
    
  //   if (!decoded) {
  //     return reply.code(401).send({ error: 'Invalid or expired token' });
  //   }

  //   request.user = decoded;
  // });
};

export default fp(authPlugin, { name: 'auth' });