import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city, description, images, amenities } = req.body;
        const owner = req.user._id;

        // Check if hotel with same name already exists for this owner
        const hotel = await Hotel.findOne({ owner });
        if (hotel) {
            return res.status(400).json({ success: false, message: "Hotel already registered by this owner" });
        }
            await Hotel.create({
            name,
            address,
            contact,
            owner,
            city,
            description,
            images,
            amenities
        });
            await User.findByIdAndUpdate(owner, { role: "hotel_owner" });


        res.status(201).json({ success: true, message: "Hotel registered successfully", hotel: newHotel });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to register hotel" });
    }
};