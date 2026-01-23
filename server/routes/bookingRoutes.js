import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    createBooking,
    getUserBookings,
    getHotelBookings,
    checkRoomAvailabilityAPI,
    stripePayment,
    stripeWebhook,
    verifyStripePayment
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

// Webhook route
bookingRouter.post("/stripe-webhook", stripeWebhook);

bookingRouter.post("/verify", protect, verifyStripePayment);

bookingRouter.post("/check-availability", checkRoomAvailabilityAPI);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel/:hotelId", protect, getHotelBookings);
bookingRouter.post("/stripe-payment", protect, stripePayment);

export default bookingRouter;
