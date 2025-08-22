"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const trip_1 = require("../schemas/trip");
const transformers_1 = require("../utils/transformers");
const validation_1 = require("../utils/validation");
const tripsRoutes = async (fastify) => {
    const collection = fastify.mongo.db.collection('trips');
    // POST /api/trips - Add new trip
    fastify.post('/trips', {
        preHandler: (0, validation_1.validateBody)(trip_1.createTripSchema)
    }, async (request, reply) => {
        const tripData = {
            ...request.validatedBody,
            createdAt: new Date()
        };
        try {
            const result = await collection.insertOne(tripData);
            const createdTrip = await collection.findOne({ _id: result.insertedId });
            if (!createdTrip) {
                return reply.code(500).send({ error: 'Failed to create trip' });
            }
            reply.code(201).send((0, transformers_1.transformTripToResponse)(createdTrip));
        }
        catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // GET /api/trips - Get all trips with pagination and filtering
    fastify.get('/trips', {
        preHandler: (0, validation_1.validateQuery)(trip_1.getTripsQuerySchema)
    }, async (request, reply) => {
        try {
            const { page, limit, destination, minBudget, maxBudget } = request.validatedQuery;
            // Build filter query
            const filter = {};
            if (destination) {
                filter.destination = { $regex: destination, $options: 'i' };
            }
            if (minBudget !== undefined || maxBudget !== undefined) {
                filter.budget = {};
                if (minBudget !== undefined)
                    filter.budget.$gte = minBudget;
                if (maxBudget !== undefined)
                    filter.budget.$lte = maxBudget;
            }
            const skip = (page - 1) * limit;
            const total = await collection.countDocuments(filter);
            const trips = await collection
                .find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .toArray();
            const response = {
                trips: trips.map(transformers_1.transformTripToResponse),
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            };
            reply.send(response);
        }
        catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // GET /api/trips/:id - Get trip by ID
    fastify.get('/trips/:id', {
        preHandler: (0, validation_1.validateParams)(trip_1.getTripParamsSchema)
    }, async (request, reply) => {
        try {
            const { id } = request.validatedParams;
            const trip = await collection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!trip) {
                return reply.code(404).send({ error: 'Trip not found' });
            }
            reply.send((0, transformers_1.transformTripToResponse)(trip));
        }
        catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // PUT /api/trips/:id - Update trip by ID
    fastify.put('/trips/:id', {
        preHandler: [
            (0, validation_1.validateParams)(trip_1.getTripParamsSchema),
            (0, validation_1.validateBody)(trip_1.updateTripSchema)
        ]
    }, async (request, reply) => {
        try {
            const { id } = request.validatedParams;
            const updateData = request.validatedBody;
            const result = await collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(id) }, { $set: updateData }, { returnDocument: 'after' });
            if (!result.value) {
                return reply.code(404).send({ error: 'Trip not found' });
            }
            reply.send((0, transformers_1.transformTripToResponse)(result.value));
        }
        catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Internal server error' });
        }
    });
    // DELETE /api/trips/:id - Delete trip by ID
    fastify.delete('/trips/:id', {
        preHandler: (0, validation_1.validateParams)(trip_1.getTripParamsSchema)
    }, async (request, reply) => {
        try {
            const { id } = request.validatedParams;
            const result = await collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (result.deletedCount === 0) {
                return reply.code(404).send({ error: 'Trip not found' });
            }
            reply.code(204).send();
        }
        catch (error) {
            fastify.log.error(error);
            reply.code(500).send({ error: 'Internal server error' });
        }
    });
};
exports.default = tripsRoutes;
//# sourceMappingURL=trips.js.map