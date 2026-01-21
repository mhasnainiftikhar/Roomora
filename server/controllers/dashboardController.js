import Booking from "../models/Booking.js";
import Room from "../models/room.js";
import Hotel from "../models/Hotel.js";

// API to get owner dashboard statistics
export const getOwnerStats = async (req, res) => {
    try {
        const ownerId = req.auth().userId;

        // Get owner's hotel
        const hotel = await Hotel.findOne({ owner: ownerId });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        // Get all rooms for this hotel
        const rooms = await Room.find({ hotel: hotel._id });
        const roomIds = rooms.map(room => room._id.toString());

        // Get all bookings for these rooms
        const bookings = await Booking.find({ room: { $in: roomIds } });

        // Calculate statistics
        const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
        const totalBookings = bookings.length;
        const activeRooms = rooms.filter(room => room.isAvailable).length;

        // Get recent bookings (last 5)
        const recentBookings = await Booking.find({ room: { $in: roomIds } })
            .populate('user')
            .populate('room')
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            stats: {
                totalRevenue,
                totalBookings,
                activeRooms,
                totalRooms: rooms.length
            },
            recentBookings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch dashboard stats" });
    }
};
