import { Router } from "express";
import { 
    createDesign,
    getDesignById,
    updateDesign,
    deleteDesign,
    listPublicDesigns,
    searchDesignsByName,
    toggleDesignVisibility
} from "../controllers/design.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, createDesign);
router.get("/public", listPublicDesigns);
router.get("/search", searchDesignsByName); // New route for search
router.get("/:id", verifyJWT, getDesignById);
router.patch("/:id", verifyJWT, updateDesign);
router.patch("/:id/toggle", verifyJWT, toggleDesignVisibility); // New route for toggle
router.delete("/:id", verifyJWT, deleteDesign);

export default router;
