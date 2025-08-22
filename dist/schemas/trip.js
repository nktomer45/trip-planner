"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.getTripsQuerySchema = exports.getTripParamsSchema = exports.updateTripSchema = exports.createTripSchema = void 0;
const zod_1 = require("zod");
exports.createTripSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required').max(100, 'Title too long'),
    destination: zod_1.z.string().min(1, 'Destination is required').max(100, 'Destination too long'),
    days: zod_1.z.number().int().min(1, 'Days must be at least 1').max(365, 'Days cannot exceed 365'),
    budget: zod_1.z.number().min(0, 'Budget must be non-negative').max(1000000, 'Budget too high'),
    createdAt: zod_1.z.date().default(() => new Date())
});
exports.updateTripSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100).optional(),
    destination: zod_1.z.string().min(1).max(100).optional(),
    days: zod_1.z.number().int().min(1).max(365).optional(),
    budget: zod_1.z.number().min(0).max(1000000).optional()
});
exports.getTripParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid trip ID format')
});
exports.getTripsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(10),
    destination: zod_1.z.string().optional(),
    minBudget: zod_1.z.coerce.number().min(0).optional(),
    maxBudget: zod_1.z.coerce.number().min(0).optional()
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, 'Username is required'),
    password: zod_1.z.string().min(1, 'Password is required')
});
//# sourceMappingURL=trip.js.map