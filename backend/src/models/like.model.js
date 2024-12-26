import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema(
    {
        design:{                    
            type:Schema.Types.ObjectId,
            ref:"Design",
            required:true
        },
        likedBy:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    },
    {
        timestamps:true
    })

export const Like = mongoose.model("Like",likeSchema);   