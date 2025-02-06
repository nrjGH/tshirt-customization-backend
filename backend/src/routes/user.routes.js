import {Router} from "express";
import { loginUser, registerUser, logoutUser, verifyUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJWT, logoutUser)
router.route("/verify").get(verifyJWT, verifyUser)
export default router