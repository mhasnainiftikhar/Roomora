import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city, description, images, amenities } = req.body;
        const owner = req.auth.userId;

        // Check if hotel with same owner already exists
        const hotel = await Hotel.findOne({ owner });
        if (hotel) {
            return res.status(400).json({ success: false, message: "Hotel already registered by this owner" });
        }

        const newHotel = await Hotel.create({
            name,
            address,
            contact,
            owner,
            city,
            description,
            images,
            amenities
        });

        // Update user role to hotelowner (matches User.js enum)
        await User.findByIdAndUpdate(owner, { role: "hotelowner" });

        res.status(201).json({ success: true, message: "Hotel registered successfully", hotel: newHotel });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to register hotel" });
    }
};