import express from 'express';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  markOrderPaid,
  updateOrderStatus
} from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/', protect, adminOnly, getAllOrders);
router.patch('/:id/pay', protect, markOrderPaid);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
