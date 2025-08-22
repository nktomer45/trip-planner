"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTripToResponse = void 0;
const transformTripToResponse = (trip) => ({
    id: trip._id,
    title: trip.title,
    destination: trip.destination,
    days: trip.days,
    budget: trip.budget,
    createdAt: trip.createdAt.toISOString()
});
exports.transformTripToResponse = transformTripToResponse;
//# sourceMappingURL=transformers.js.map