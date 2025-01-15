import { Cart } from "../models/cart.model.js";
import { Design } from "../models/design.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Add a design to the cart
export const addToCart = asyncHandler(async (req, res) => {
    const { designId, quantity } = req.body;

    if (!designId || !quantity) {
        throw new ApiError(400, "Design ID and quantity are required.");
    }

    const designExists = await Design.exists({ _id: designId });
    if (!designExists) {
        throw new ApiError(404, "Design not found.");
    }

    let cart = await Cart.findOne({ owner: req.user._id });
    if (!cart) {
        cart = new Cart({ owner: req.user._id, designs: [] });
    }

    const existingDesignIndex = cart.designs.findIndex(
        (item) => item.design_id.toString() === designId
    );

    if (existingDesignIndex > -1) {
        cart.designs[existingDesignIndex].quantity += quantity;
    } else {
        cart.designs.push({ design_id: designId, quantity });
    }

    await cart.save();
    return res
        .status(200)
        .json(new ApiResponse(200, cart, "Design added to cart successfully."));
});

// Get the user's cart 
export const getCart = asyncHandler(async (req, res) => {
    const {userId} = req.params
    var cart;
    try{
        cart = await Cart.find({owner:userId})

        if(cart.length === 0){
            return res
            .status(200)
            .json(new ApiResponse(200,[],"user has zero designs in the cart"))
        }
    
        return res.status(200)
        .json(new ApiResponse(200, playlists, "succesfully fetched cart"))

    }catch(error){
        console.log(error)
        throw new ApiError(400,"error extracting playlists")
    }
});

// Update the quantity of a design in the cart
export const updateCart = asyncHandler(async (req, res) => {
    const { designId, quantity } = req.body;

    if (!designId || !quantity) {
        throw new ApiError(400, "Design ID and quantity are required.");
    }

    const cart = await Cart.findOne({ owner: req.user._id });
    if (!cart) {
        throw new ApiError(404, "Cart not found.");
    }

    const designIndex = cart.designs.findIndex(
        (item) => item.design_id.toString() === designId
    );

    if (designIndex === -1) {
        throw new ApiError(404, "Design not found in cart.");
    }

    cart.designs[designIndex].quantity = quantity;

    await cart.save();
    return res
        .status(200)
        .json(new ApiResponse(200, cart, "Cart updated successfully."));
});

// Remove a design from the cart
export const removeFromCart = asyncHandler(async (req, res) => {
    const { designId } = req.body;

    if (!designId) {
        throw new ApiError(400, "Design ID is required.");
    }

    const cart = await Cart.findOne({ owner: req.user._id });
    if (!cart) {
        throw new ApiError(404, "Cart not found.");
    }

    cart.designs = cart.designs.filter(
        (item) => item.design_id.toString() !== designId
    );

    await cart.save();
    return res
        .status(200)
        .json(new ApiResponse(200, cart, "Design removed from cart successfully."));
});
