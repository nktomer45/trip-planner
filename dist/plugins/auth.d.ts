import { FastifyPluginAsync } from 'fastify';
declare module 'fastify' {
    interface FastifyRequest {
        user?: {
            userId: string;
            username: string;
        };
    }
}
declare const _default: FastifyPluginAsync;
export default _default;
//# sourceMappingURL=auth.d.ts.map