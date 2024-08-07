import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})                                 // validateBeforeSave is used in conditions where validation part is not necesarry ,so that gets ignored and saving occurs smoothly

        return {accessToken, refreshToken}

    }catch(error){
        console.log(error)
        throw new ApiError(500,"cannot generate user access and refresh tokens")
    }
}

const registerUser = asyncHandler( async(req,res) => {
    const { username, email, fullname, password} = req.body;
    if(
        [fullname, email, username, password].some((field) =>           // some is used on arrays, if any of those fields is empty, error
        field?.trim() === "")
    ){
        throw new ApiError(400,"fill the compulsory fields")
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}]                                       // or operator used
    })
    if(existedUser){
        throw new ApiError(409, "username or email already exists")
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(           // ajib syntax there is nothing we can do : we dont want user details password and refreshtoken to be reciprocated, so "-" will ignore those
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "error while registering user")
    }

    const response = res.status(201).json(
        new ApiResponse(200, createdUser, "created user succesfully")
    )
    return response
})

const loginUser = asyncHandler( async (req, res) => {

    const {email, username, password} = req.body
    if(!(username || email)){
        throw new ApiError(400, "username or email is required for login")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,"does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"invalid credentials")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly : true,                                            // cookies be available only through http
        secure : true                                               // cookies be shared only via https    
    }

    return res
    .status(200).
    cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser, accessToken , refreshToken
            },
            "user logged in succesfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset : {
                refreshToken : 1                            //removes field from the document
            }
        },
        {
            new : true
        }
    )

    const options = {
        httpOnly : true,
        secure : true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out succesfully"))
})

const changeCurrentPassword = asyncHandler(async(req,res) => {
    const {oldPassword, newPassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "invalid old password")
    }

    user.password = newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"password changed succesfully"))
})

const getCurrentUser = asyncHandler(async(req,res) =>{
    return res
    .status(200)
    .json(200,req.user, "user fetched succesfully")
})

const updateUsername = asyncHandler( async(req,res) =>{
    const {oldUsername, newUsername} = req.body

    if(oldUsername === newUsername){
        throw new ApiError(401, "usernames are same! ")
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                username: newUsername
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse (200, user, "username updated !"))
})

const updateEmail = asyncHandler( async(req,res) =>{
    const {newEmail} = req.body

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                email: newEmail
            }
        },
        {new:true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse (200, user, "email updated !"))
}) 

export {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    updateUsername,
    updateEmail
}