import mongoose, {Schema} from 'mongoose'
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        index:true
    },
    fullname:{
        type: String,
        required: true,
        index:true
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
    },
    profilepic:{
        type: String,
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password)  {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken = function(){                           // if you dont return no access and refresh token they wont be generated duh
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

export const User = mongoose.model("User", userSchema)