"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const authPlugin = async (fastify) => {
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
exports.default = (0, fastify_plugin_1.default)(authPlugin, { name: 'auth' });
//# sourceMappingURL=auth.js.map