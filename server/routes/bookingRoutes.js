import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
    createBooking,
    getUserBookings,
    getHotelBookings,
    checkRoomAvailabilityAPI
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkRoomAvailabilityAPI);
bookingRouter.post("/create", protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel/:hotelId", protect, getHotelBookings);

export default bookingRouter;
