import express from 'express';
import { body } from 'express-validator';
import { getProfile, loginUser, registerUser, updateWishlist } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  registerUser
);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);
router.patch('/wishlist', protect, updateWishlist);

export default router;
