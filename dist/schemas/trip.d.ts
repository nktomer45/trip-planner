import { z } from 'zod';
export declare const createTripSchema: z.ZodObject<{
    title: z.ZodString;
    destination: z.ZodString;
    days: z.ZodNumber;
    budget: z.ZodNumber;
    createdAt: z.ZodDefault<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    days: number;
    title: string;
    destination: string;
    budget: number;
    createdAt: Date;
}, {
    days: number;
    title: string;
    destination: string;
    budget: number;
    createdAt?: Date | undefined;
}>;
export declare const updateTripSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    destination: z.ZodOptional<z.ZodString>;
    days: z.ZodOptional<z.ZodNumber>;
    budget: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    days?: number | undefined;
    title?: string | undefined;
    destination?: string | undefined;
    budget?: number | undefined;
}, {
    days?: number | undefined;
    title?: string | undefined;
    destination?: string | undefined;
    budget?: number | undefined;
}>;
export declare const getTripParamsSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const getTripsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    destination: z.ZodOptional<z.ZodString>;
    minBudget: z.ZodOptional<z.ZodNumber>;
    maxBudget: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    destination?: string | undefined;
    minBudget?: number | undefined;
    maxBudget?: number | undefined;
}, {
    destination?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    minBudget?: number | undefined;
    maxBudget?: number | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
//# sourceMappingURL=trip.d.ts.map