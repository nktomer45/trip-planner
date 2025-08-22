  import { z } from 'zod';

  export const createTripSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
    destination: z.string().min(1, 'Destination is required').max(100, 'Destination too long'),
    days: z.number().int().min(1, 'Days must be at least 1').max(365, 'Days cannot exceed 365'),
    budget: z.number().min(0, 'Budget must be non-negative').max(1000000, 'Budget too high'),
    createdAt: z.date().default(() => new Date()) 
  });

  export const updateTripSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    destination: z.string().min(1).max(100).optional(),
    days: z.number().int().min(1).max(365).optional(),
    budget: z.number().min(0).max(1000000).optional()
  });

  export const getTripParamsSchema = z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid trip ID format')
  });

  export const getTripsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    destination: z.string().optional(),
    minBudget: z.coerce.number().min(0).optional(),
    maxBudget: z.coerce.number().min(0).optional()
  });

  export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
  });