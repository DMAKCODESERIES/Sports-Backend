import express from 'express';
import { createRating, getUserRatings } from '../controllers/rating.controller.js';
import { authenticateUser, authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router()

router.post('/create-rating',authenticateUser,createRating)
router.get('/get-rating/:id',authenticateUser,getUserRatings)

export default router