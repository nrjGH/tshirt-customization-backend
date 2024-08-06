import mongoose, {Schema} from "mongoose";

const cartSchema = new Schema(
    {
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
        },
        designs:[{
            type:Schema.Types.ObjectId,
            ref:"Design",
        }],
    },
    {
        timestamps:true
    }
)

export const Cart = mongoose.model("Cart",cartSchema);