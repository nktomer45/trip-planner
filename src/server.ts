import Fastify from 'fastify';
import cors from '@fastify/cors';
import mongodb from '@fastify/mongodb';
import authPlugin from './plugins/auth';
import tripsRoutes from './routes/trips';
import authRoutes from './routes/auth';
import dotenv from 'dotenv'

dotenv.config()
const fastify = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || 'info'
  }
});

const start = async () => {
  try {
    // Register plugins
    await fastify.register(cors, {
      origin: true,
      credentials: true
    });

    // MongoDB connection
    await fastify.register(mongodb, {
      url: process.env.MONGODB_URL //|| 'mongodb://localhost:27017/tripdb'
    });

    // Auth plugin
    await fastify.register(authPlugin);

    // Routes
    await fastify.register(tripsRoutes, { prefix: '/api' });
    await fastify.register(authRoutes, { prefix: '/api' });

    // Health check endpoint
    fastify.get('/health', async (request, reply) => {
      return { status: 'OK', timestamp: new Date().toISOString() };
    });

    // Start server
    const port = parseInt(process.env.PORT || '3000', 10);
    const host = process.env.HOST || '0.0.0.0';

    await fastify.listen({ port, host });
    fastify.log.info(`Server listening on http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  await fastify.close();
});

process.on('SIGINT', async () => {
  await fastify.close();
});

start();
