import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const designSchema = new Schema(
    {
        designFile:{
            type:String, 
            required:true
        },
        createdBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        name:{
            type:String,
            required:true,
            index:true
        },
        isPublic:{
            type:Boolean,
            default :false
        },
        color:{
            type:String,
            required:true
        }
    },
    {
    timestamps:true
    }
)

designSchema.plugin(mongooseAggregatePaginate)

export const Design = mongoose.model("Design",designSchema);