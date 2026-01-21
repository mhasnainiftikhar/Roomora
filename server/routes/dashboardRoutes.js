import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getOwnerStats } from '../controllers/dashboardController.js';

const dashboardRouter = express.Router();

dashboardRouter.get('/owner-stats', protect, getOwnerStats);

export default dashboardRouter;
