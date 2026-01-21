import Room from "../models/room.js";
import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";

//Api to create a room
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.status(400).json({ success: false, message: "No hotel found for this owner" });
        }

        // Upload images to Cloudinary
        const images = [];
        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => cloudinary.uploader.upload(file.path, { resource_type: 'image' }));
            const uploadResults = await Promise.all(uploadPromises);
            uploadResults.forEach(result => images.push(result.secure_url));
        }

        const newRoom = await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: Number(pricePerNight),
            amenities: JSON.parse(amenities),
            images,
        });

        res.status(201).json({ success: true, message: "Room created successfully", room: newRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to create room" });
    }
};

//Api to get all rooms (Public)
export const getRooms = async (req, res) => {
    try {
        const rooms = (await Room.find({ isAvailable: true }).populate({ path: 'hotel',populate: { path: 'owner', select: 'images' } })).toSorted({ createdAt: -1 });
        res.status(200).json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch rooms" });
    }
};

//api to get rooms of an owner
export const getOwnerRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }
        const rooms = await Room.find({ hotel: hotel._id.toString() }).populate('hotel');
        res.status(200).json({ success: true, rooms });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch owner rooms" });
    }
};

//api to toggle room availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        room.isAvailable = !room.isAvailable;
        await room.save();

        res.status(200).json({ success: true, message: "Room availability updated", isAvailable: room.isAvailable });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to toggle availability" });
    }
};