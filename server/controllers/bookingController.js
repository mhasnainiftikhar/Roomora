import Booking from "../models/Booking.js";
import Room from "../models/room.js";
import Hotel from "../models/Hotel.js";

// Helper function to check Availability
export const checkAvailability = async (checkInDate, checkOutDate, roomId) => {
    try {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);

        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            console.error("Invalid dates provided:", { checkInDate, checkOutDate });
            return false;
        }

        const bookings = await Booking.find({
            room: roomId,
            status: { $ne: "cancelled" },
            $or: [
                {
                    checkInDate: { $lt: checkOut },
                    checkOutDate: { $gt: checkIn },
                }
            ]
        });
        return bookings.length === 0;
    } catch (error) {
        console.error("Error checking availability:", error);
        return false;
    }
};

// API to check room availability
export const checkRoomAvailabilityAPI = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, roomId } = req.body;
        const isAvailable = await checkAvailability(checkInDate, checkOutDate, roomId);
        res.json({ success: true, available: isAvailable });
    } catch (error) {
        console.error("Error in availability API:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Create Booking
export const createBooking = async (req, res) => {
    try {
        const { room: roomId, hotel: hotelId, checkInDate, checkOutDate, guests, paymentMethod } = req.body;
        const user = req.auth().userId;

        // Check if the user is the owner of the hotel
        const hotelData = await Hotel.findById(hotelId);
        if (hotelData && hotelData.owner === user) {
            return res.status(403).json({ success: false, message: "Owners cannot book their own property rooms." });
        }

        const isAvailable = await checkAvailability(checkInDate, checkOutDate, roomId);
        if (!isAvailable) {
            return res.status(400).json({ success: false, message: "Room is not available for the selected dates." });
        }

        const roomData = await Room.findById(roomId);
        if (!roomData) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        const nights = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
        const totalPrice = nights * roomData.pricePerNight;

        const newBooking = new Booking({
            user,
            room: roomId,
            hotel,
            checkInDate,
            checkOutDate,
            totalPrice,
            guests: Number(guests),
            paymentMethod,
            isPaid: paymentMethod === "Online Payment",
            status: "confirmed"
        });

        await newBooking.save();
        res.status(201).json({ success: true, message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.auth().userId;
        const bookings = await Booking.find({ user: userId })
            .populate("room")
            .populate("hotel")
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Get hotel bookings
export const getHotelBookings = async (req, res) => {
    try {
        const { hotelId } = req.params;
        const bookings = await Booking.find({ hotel: hotelId })
            .populate("room")
            .populate("user")
            .sort({ createdAt: -1 });

        const totalBookings = bookings.length;
        const totalEarnings = bookings
            .filter(b => b.status === "confirmed")
            .reduce((sum, b) => sum + b.totalPrice, 0);

        res.json({ success: true, bookings, totalBookings, totalEarnings });
    } catch (error) {
        console.error("Error fetching hotel bookings:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
