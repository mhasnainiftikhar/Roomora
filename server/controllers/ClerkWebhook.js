import User from "../models/User.js";
import { Webhook } from "svix";
import 'dotenv/config';
import e from "express";

export const handleClerkWebhook = async (req, res) => {
    try {
        // Initialize the Svix Webhook with your signing secret
        const Whook = new Webhook(process.env.CLERK_WEBHOOK_SIGNING_SECRET);
        //Getting Headers
     const headers={
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        };

     //Verify the Headers
     await Whook.verify(JSON.stringify(req.body), headers);

        //Getting data from the request body
        const { type, data } = req.body;

     const userData={
            _id: data.id,
            username: data.first_name + " " + data.last_name,
            email: data.email_addresses[0].email_address,
            image: data.profile_image_url,
        }
        //Switch case for different event types
        switch (type) {
        case "user.created":{
                await User.create(userData);
                break;
            }
        case "user.updated":{
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }
        case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
        res.json({success:true, message:"Webhook processed successfully"});

    } catch (error) {
    console.error( error.message);
        res.status(400).json({ success: false, message: "Invalid webhook event" });
    }
};

export default handleClerkWebhook;
