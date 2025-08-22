"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trip_1 = require("../schemas/trip");
const auth_1 = require("../utils/auth");
const validation_1 = require("../utils/validation");
const authRoutes = async (fastify) => {
    // POST /api/auth/login - Login with hardcoded credentials
    fastify.post('/auth/login', {
        preHandler: (0, validation_1.validateBody)(trip_1.loginSchema)
    }, async (request, reply) => {
        try {
            const { username, password } = request.validatedBody;
            const user = await (0, auth_1.validateCredentials)(username, password);
            if (!user) {
                return reply.code(401).send({ error: 'Invalid credentials' });
            }
            const token = (0, auth_1.generateToken)(user.id, user.username);
            const response = {
                token,
                user: {
                    id: user.id,
                    username: user.username
                }
            };
            reply.send(response);
        }
        catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // GET /api/auth/me - Get current user info
    fastify.get('/auth/me', async (request, reply) => {
        reply.send({ user: request.user });
    });
};
exports.default = authRoutes;
//# sourceMappingURL=auth.js.map