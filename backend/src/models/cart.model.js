import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        designs: [
            {
                design_id: {
                    type: Schema.Types.ObjectId,
                    ref: "Design",
                },
                quantity: {
                    type: Number,
                },
            },
        ],
    },
    {
        timestamps: true,  // Automatically handles created_at and updated_at
    }
);

export const Cart = mongoose.model("Cart", cartSchema);