import express from 'express'
import {
  addOrderItems,
  deleteOrder,
  getAllOrders,
  getSpecificUserOrder,
  deleteSpecificOrder,
  getUserOrder,
  updateOrder,
} from '../controllers/orderController.js'
import { protect, verifyAdmin } from '../middleware/authMiddlewareHandler.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, getUserOrder)
router
  .route('/:orderId')
  .get(protect, getSpecificUserOrder)
  .delete(protect, deleteSpecificOrder)

router
  .route('/:id')
  .patch(protect, updateOrder)
  .delete(verifyAdmin, deleteOrder)

//admin routes
router.route('/allOrders').get(verifyAdmin, getAllOrders)

export default router
