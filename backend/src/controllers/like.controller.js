import { Like } from "../models/like.model.js";
import { Design } from "../models/design.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//Toggle like status for a design 
const toggleLike = asyncHandler(async (req, res) => {
    const { designId } = req.params;

    // Check if the design exists
    const design = await Design.findById(designId);
    if (!design) {
        throw new ApiError(404, "Design not found");
    }

    // Check if the user already liked the design
    const existingLike = await Like.findOne({ design: designId, likedBy: req.user._id });

    if (existingLike) {
        // If already liked, remove the like and update the Design's likedBy array
        await existingLike.deleteOne();
        design.likedBy = design.likedBy.filter(
            (userId) => userId.toString() !== req.user._id.toString()
        );

        await design.save();

        return res
            .status(200)
            .json(new ApiResponse(200, { likeCount: design.likedBy.length }, "Like removed successfully"));
    } 
    else{
        // If not liked, add a new like and update the Design's likedBy array
        await Like.create({ design: designId, likedBy: req.user._id });
        design.likedBy.push(req.user._id);
        
        await design.save();

        return res
            .status(201)
            .json(new ApiResponse(201, { likeCount: design.likedBy.length }, "Like added successfully"));
    }
});



//Check if the current user has liked a specific design
const checkUserLikeStatus = asyncHandler(async (req, res) => {
    const { designId } = req.params;

    // Verify design exists
    const designExists = await Design.exists({ _id: designId });
    if (!designExists) {
        throw new ApiError(404, "Design not found");
    }

    const likedByUser = await Like.exists({ design: designId, likedBy: req.user._id });

    if(!likedByUser){
        throw new ApiError(404, "Failed to retrieve if like exists")
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { liked: !!likedByUser }, "User like status fetched successfully"));
});


//Get like count for a specific design
const getLikeCountForDesign = asyncHandler(async (req, res) => {
    const { designId } = req.params;

    // Verify design exists
    const designExists = await Design.exists({ _id: designId });
    if (!designExists) {
        throw new ApiError(404, "Design not found");
    }

    const design = await Design.findById(designId);

    const likeCount = await design.likedBy.length;

    if(!likeCount){
        throw new ApiError(404, "Failed to get count of likes!");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, { likeCount }, "Like count fetched successfully"));
});

export {
    toggleLike,
    checkUserLikeStatus,
    getLikeCountForDesign,
};
