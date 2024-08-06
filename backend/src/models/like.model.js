import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema(
    {
        design:{                    
            type:Schema.Types.ObjectId,
            ref:"Design"
        },
        likedBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    })

export const Like = mongoose.model("Like",likeSchema);   