import { ObjectId } from 'mongodb';
export interface TripPlan {
  _id?: ObjectId;
  title: string;
  destination: string;
  days: number;
  budget: number;
  createdAt: Date;
}

export interface CreateTripRequest {
  title: string;
  destination: string;
  days: number;
  budget: number;
}

export interface UpdateTripRequest {
  title?: string;
  destination?: string;
  days?: number;
  budget?: number;
}

export interface TripResponse {
  id: ObjectId;
  title: string;
  destination: string;
  days: number;
  budget: number;
  createdAt: string;
}

export interface PaginatedTripsResponse {
  trips: TripResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface QueryParams {
  page?: string;
  limit?: string;
  destination?: string;
  minBudget?: string;
  maxBudget?: string;
}