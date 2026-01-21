import express from "express";
import { createRoom, getRooms, getOwnerRooms, toggleRoomAvailability } from "../controllers/roomController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const roomRouter = express.Router();

roomRouter.post("/create-room", upload.array("images"),protect, createRoom);
roomRouter.get("/get-rooms", getRooms);
roomRouter.get("/owner-rooms",protect, getOwnerRooms);
roomRouter.post("/toggle-availability/:roomId",protect, toggleRoomAvailability);

export default roomRouter;