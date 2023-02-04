import Order from '../models/Order.js'
import asyncHandler from 'express-async-handler'

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()

  if (orders) {
    res.status(201).json(orders)
  } else {
    res.status(400)
    throw new Error('No orders')
  }
})

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingFee,
    taxPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No items to create order')
  } else {
    const newOrder = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingFee,
      taxPrice,
      totalPrice,
    })

    const saveOrder = await newOrder.save()

    if (saveOrder) {
      return res
        .status(201)
        .json({ message: 'Order created successfully', order: saveOrder })
    } else {
      res.status(400)
      throw new Error("Can't create order")
    }
  }
})

const getUserOrder = asyncHandler(async (req, res) => {
  const userOrders = await Order.find({ user: req.user._id })

  if (!userOrders || userOrders.length === 0) {
    res.status(400)
    throw new Error('No orders available')
  } else {
    return res.status(200).json({ orders: userOrders })
  }
})

const getSpecificUserOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params

  const order = await Order.findById(orderId)

  if (!order) {
    res.status(400)
    throw new Error('No order found')
  } else {
    return res.status(200).json({ order: order })
  }
})

const deleteSpecificOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params

  const deleteOrder = await Order.findByIdAndDelete(orderId)

  if (deleteOrder) {
    return res.status(200).json({ message: 'Order deleted successfully' })
  } else {
    res.status(400)
    throw new Error('Order does not exist')
  }
})

//Admin order routes
const deleteOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id

  const order = await Order.findByIdAndDelete(orderId)

  if (order) {
    res.json('Order deleted successfully')
  } else {
    res.status(400)
    throw new Error('Order does not exist')
  }
})

const updateOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id

  const updatedOrder = await Order.findByIdAndUpdate(
    { _id: orderId },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (updatedOrder) {
    res.status(200).json('Order updated successfully')
  } else {
    res.status(400)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getAllOrders,
  getUserOrder,
  updateOrder,
  deleteOrder,
  getSpecificUserOrder,
  deleteSpecificOrder,
}
