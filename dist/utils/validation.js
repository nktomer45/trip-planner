"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = exports.validateParams = exports.validateBody = void 0;
const zod_1 = require("zod");
const validateBody = (schema) => {
    return (request, reply, done) => {
        try {
            const result = schema.parse(request.body);
            request.validatedBody = result;
            done();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                reply.code(400).send({
                    error: 'Validation failed',
                    details: error.issues
                });
            }
            else {
                reply.code(400).send({ error: 'Invalid request body' });
            }
        }
    };
};
exports.validateBody = validateBody;
const validateParams = (schema) => {
    return (request, reply, done) => {
        try {
            const result = schema.parse(request.params);
            request.validatedParams = result;
            done();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                reply.code(400).send({
                    error: 'Invalid parameters',
                    details: error.issues
                });
            }
            else {
                reply.code(400).send({ error: 'Invalid request parameters' });
            }
        }
    };
};
exports.validateParams = validateParams;
const validateQuery = (schema) => {
    return (request, reply, done) => {
        try {
            const result = schema.parse(request.query);
            request.validatedQuery = result;
            done();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                reply.code(400).send({
                    error: 'Invalid query parameters',
                    details: error.issues
                });
            }
            else {
                reply.code(400).send({ error: 'Invalid query parameters' });
            }
        }
    };
};
exports.validateQuery = validateQuery;
//# sourceMappingURL=validation.js.map