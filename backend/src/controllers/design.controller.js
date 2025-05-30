import { Design } from "../models/design.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create a new design
const createDesign = asyncHandler(async (req, res) => {
    const { designLink, name, isPublic, color } = req.body;

    if (![designLink, name, color].every(Boolean)) {
        throw new ApiError(400, "Design link, name, and color are required");
    }

    const design = await Design.create({
        designLink,
        name,
        isPublic,
        color,
        createdBy: req.user._id,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, design, "Design created successfully"));
});

// Get a design by ID
const getDesignById = asyncHandler(async (req, res) => {
    const design = await Design.findById(req.params.id)
        .populate("createdBy", "username fullname")
        .populate("likedBy", "username fullname");

    if (!design) {
        throw new ApiError(404, "Design not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, design, "Design fetched successfully"));
});

// Update a design
const updateDesign = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, isPublic, color } = req.body;

    const design = await Design.findOneAndUpdate(
        { _id: id, createdBy: req.user._id },
        { name, isPublic, color },
        { new: true, runValidators: true }
    );

    if (!design) {
        throw new ApiError(404, "Design not found or not authorized");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, design, "Design updated successfully"));
});

// Delete a design
const deleteDesign = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const design = await Design.findOneAndDelete({ _id: id, createdBy: req.user._id });

    if (!design) {
        throw new ApiError(404, "Design not found or not authorized");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Design deleted successfully"));
});

// List all public designs (does not work as of 2025-01-03)
// const listPublicDesigns = asyncHandler(async (req, res) => {
//     const { page = 1, limit = 10 } = req.query;
//     const designs = await Design.aggregatePaginate(
//         { isPublic: true },
//         { page, limit, populate: "createdBy", select: "username fullname" }
//     );

//     return res
//         .status(200)
//         .json(new ApiResponse(200, designs, "Public designs fetched successfully"));
// });

const listPublicDesigns = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: { path: 'createdBy', select: 'username fullname' }
    };

    const aggregate = Design.aggregate([
        { $match: { isPublic: true } }
    ]);

    const designs = await Design.aggregatePaginate(aggregate, options);

    return res
        .status(200)
        .json(new ApiResponse(200, designs, "Public designs fetched successfully"));
});

// Toggle the design to be public/private
const toggleDesignVisibility = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const design = await Design.findOne({ _id: id, createdBy: req.user._id });
    if (!design) {
        throw new ApiError(404, "Design not found or not authorized");
    }

    design.isPublic = !design.isPublic;
    await design.save();

    return res
        .status(200)
        .json(new ApiResponse(200, design, "Design visibility toggled successfully"));
});

// Search design using its name (does not work as of 2025-01-03)
// const searchDesignsByName = asyncHandler(async (req, res) => {
//     const { query, page = 1, limit = 10 } = req.query;

//     console.log(query);

//     if (!query) {
//         throw new ApiError(400, "Search query is required");
//     }

//     const designs = await Design.aggregatepaginate(
//         { name: { $regex: query, $options: "i" } },
//         { page, limit, populate: "createdBy", select: "username fullname" }
//     );

//     if (designs.docs.length === 0) {
//         return res
//             .status(404)
//             .json(new ApiResponse(404, {}, "No designs matched your search"));
//     }

//     return res
//         .status(200)
//         .json(new ApiResponse(200, designs, "Search results fetched successfully"));
// });
const searchDesignsByName = asyncHandler(async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;
 
    if (!query) {
        throw new ApiError(400, "Search query is required");
    }
 
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        populate: { path: 'createdBy', select: 'username fullname' }
    };
 
    const aggregate = Design.aggregate([
        { $match: { name: { $regex: query, $options: "i" } } }
    ]);
 
    const designs = await Design.aggregatePaginate(aggregate, options);
 
    if (designs.docs.length === 0) {
        return res
            .status(404)
            .json(new ApiResponse(404, {}, "No designs matched your search"));
    }
 
    return res
        .status(200)
        .json(new ApiResponse(200, designs, "Search results fetched successfully"));
 });


export {
    createDesign,
    getDesignById,
    updateDesign,
    deleteDesign,
    listPublicDesigns,
    toggleDesignVisibility,
    searchDesignsByName
};
