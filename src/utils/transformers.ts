import { TripPlan, TripResponse } from '../types/trip';

export const transformTripToResponse = (trip: TripPlan): TripResponse => ({
  id: trip._id!,
  title: trip.title,
  destination: trip.destination,
  days: trip.days,
  budget: trip.budget,
  createdAt: trip.createdAt.toISOString()
});