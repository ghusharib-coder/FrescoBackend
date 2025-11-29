import express from 'express';
import { loginUser, SignUpUser } from './Controller.js';
import { addToCart,getCart,removeFromCart } from './Controller.js';
const router = express.Router();

router.post("/signup", SignUpUser);
router.post("/login", loginUser);
router.post("/add", addToCart);
router.get("/cart/:userId", getCart);
router.delete("/remove", removeFromCart);

export default router;
