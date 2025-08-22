import { FastifyPluginAsync } from 'fastify';
import { ObjectId } from 'mongodb';
import {
  createTripSchema,
  updateTripSchema,
  getTripParamsSchema,
  getTripsQuerySchema
} from '../schemas/trip';
import {
  CreateTripRequest,
  UpdateTripRequest,
  TripPlan,
  PaginatedTripsResponse,
  QueryParams
} from '../types/trip';
import { transformTripToResponse } from '../utils/transformers';
import { validateBody, validateParams, validateQuery } from '../utils/validation';

const tripsRoutes: FastifyPluginAsync = async (fastify) => {
  const collection = fastify.mongo.db!.collection<TripPlan>('trips');

  // POST /api/trips - Add new trip
  fastify.post<{ Body: CreateTripRequest }>(
    '/trips',
    {
      preHandler: validateBody(createTripSchema)
    },
    async (request, reply) => {
      const tripData: TripPlan = {
        ...(request as any).validatedBody,
        createdAt: new Date()
      };

      try {
        const result = await collection.insertOne(tripData);
        const createdTrip = await collection.findOne({ _id: result.insertedId });
        
        if (!createdTrip) {
          return reply.code(500).send({ error: 'Failed to create trip' });
        }

        reply.code(201).send(transformTripToResponse(createdTrip));
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // GET /api/trips - Get all trips with pagination and filtering
  fastify.get<{ Querystring: QueryParams }>(
    '/trips',
    {
      preHandler: validateQuery(getTripsQuerySchema)
    },
    async (request, reply) => {
      try {
        const { page, limit, destination, minBudget, maxBudget } = (request as any).validatedQuery;

        // Build filter query
        const filter: any = {};
        if (destination) {
          filter.destination = { $regex: destination, $options: 'i' };
        }
        if (minBudget !== undefined || maxBudget !== undefined) {
          filter.budget = {};
          if (minBudget !== undefined) filter.budget.$gte = minBudget;
          if (maxBudget !== undefined) filter.budget.$lte = maxBudget;
        }

        const skip = (page - 1) * limit;
        const total = await collection.countDocuments(filter);
        const trips = await collection
          .find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();

        const response: PaginatedTripsResponse = {
          trips: trips.map(transformTripToResponse),
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
          }
        };

        reply.send(response);
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // GET /api/trips/:id - Get trip by ID
  fastify.get<{ Params: { id: string } }>(
    '/trips/:id',
    {
      preHandler: validateParams(getTripParamsSchema)
    },
    async (request, reply) => {
      try {
        const { id } = (request as any).validatedParams;
        const trip = await collection.findOne({ _id: new ObjectId(id) });

        if (!trip) {
          return reply.code(404).send({ error: 'Trip not found' });
        }

        reply.send(transformTripToResponse(trip));
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // PUT /api/trips/:id - Update trip by ID
  fastify.put<{ Params: { id: string }; Body: UpdateTripRequest }>(
    '/trips/:id',
    {
      preHandler: [
        validateParams(getTripParamsSchema),
        validateBody(updateTripSchema)
      ]
    },
    async (request, reply) => {
      try {
        const { id } = (request as any).validatedParams;
        const updateData = (request as any).validatedBody;

        const result = await collection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updateData },
          { returnDocument: 'after' }
        );

        if (!result.value) {
          return reply.code(404).send({ error: 'Trip not found' });
        }

        reply.send(transformTripToResponse(result.value));
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );

  // DELETE /api/trips/:id - Delete trip by ID
  fastify.delete<{ Params: { id: string } }>(
    '/trips/:id',
    {
      preHandler: validateParams(getTripParamsSchema)
    },
    async (request, reply) => {
      try {
        const { id } = (request as any).validatedParams;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
          return reply.code(404).send({ error: 'Trip not found' });
        }

        reply.code(204).send();
      } catch (error) {
        fastify.log.error(error);
        reply.code(500).send({ error: 'Internal server error' });
      }
    }
  );
};

export default tripsRoutes;