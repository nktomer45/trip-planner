"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const mongodb_1 = __importDefault(require("@fastify/mongodb"));
const auth_1 = __importDefault(require("./plugins/auth"));
const trips_1 = __importDefault(require("./routes/trips"));
const auth_2 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const fastify = (0, fastify_1.default)({
    logger: {
        level: process.env.LOG_LEVEL || 'info'
    }
});
const start = async () => {
    try {
        // Register plugins
        await fastify.register(cors_1.default, {
            origin: true,
            credentials: true
        });
        // MongoDB connection
        await fastify.register(mongodb_1.default, {
            url: process.env.MONGODB_URL, //|| 'mongodb://localhost:27017/tripdb'
            database: "tripdb",
        });
        // Auth plugin
        await fastify.register(auth_1.default);
        // Routes
        await fastify.register(trips_1.default, { prefix: '/api' });
        await fastify.register(auth_2.default, { prefix: '/api' });
        // Health check endpoint
        fastify.get('/health', async (request, reply) => {
            return { status: 'OK', timestamp: new Date().toISOString() };
        });
        // Start server
        const port = parseInt(process.env.PORT || '3000', 10);
        const host = process.env.HOST || '0.0.0.0';
        await fastify.listen({ port, host });
        fastify.log.info(`Server listening on http://localhost:${port}`);
    }
    catch (err) {
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
//# sourceMappingURL=server.js.map