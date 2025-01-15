import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

// Add a design to the cart
router.post("/add", verifyJWT, addToCart);

// Update a design's quantity in the cart
router.put("/update", verifyJWT, updateCart);

// Remove a design from the cart
router.delete("/remove", verifyJWT, removeFromCart);

// Get the user's cart
router.get("/", verifyJWT, getCart);

export default router;
