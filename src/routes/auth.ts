import { FastifyPluginAsync } from 'fastify';
import { loginSchema } from '../schemas/trip';
import { LoginRequest, LoginResponse } from '../types/trip';
import { validateCredentials, generateToken } from '../utils/auth';
import { validateBody } from '../utils/validation';

const authRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /api/auth/login - Login with hardcoded credentials
  fastify.post<{ Body: LoginRequest }>(
    '/auth/login',
    {
      preHandler: validateBody(loginSchema)
    },
    async (request, reply) => {
      try {
        const { username, password } = (request as any).validatedBody;
        
        const user = await validateCredentials(username, password);
        if (!user) {
          return reply.code(401).send({ error: 'Invalid credentials' });
        }

        const token = generateToken(user.id, user.username);
        const response: LoginResponse = {
          token,
          user: {
            id: user.id,
            username: user.username
          }
        };

        reply.send(response);
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // GET /api/auth/me - Get current user info
  fastify.get('/auth/me', async (request, reply) => {
    reply.send({ user: request.user });
  });
};

export default authRoutes;