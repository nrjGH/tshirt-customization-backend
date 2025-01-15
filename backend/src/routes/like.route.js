import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    toggleLike,
    checkUserLikeStatus,
    getLikeCountForDesign,
} from "../controllers/like.controller.js";

const router = Router();

// Route to toggle like status for a design
router.post("/:designId/toggle", verifyJWT, toggleLike);

// Route to check if the current user has liked a specific design
router.get("/:designId/status", verifyJWT, checkUserLikeStatus);

router.get("/:designId/count", getLikeCountForDesign);

export default router;