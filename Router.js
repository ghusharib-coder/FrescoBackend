import express from 'express';
import { loginUser, SignUpUser } from './Controller.js';
import { addToCart,getCart,removeFromCart } from './Controller.js';
import { createOrder, processPayment, getUserOrders, getOrderDetails } from './Controller.js';
const router = express.Router();

router.post("/signup", SignUpUser);
router.post("/login", loginUser);
router.post("/add", addToCart);
router.get("/cart/:userId", getCart);
router.delete("/remove", removeFromCart);

// Order routes
router.post("/order/create", createOrder);
router.post("/order/payment", processPayment);
router.get("/orders/:userId", getUserOrders);
router.get("/order/:orderId", getOrderDetails);

export default router;
