import { Router } from "express";
import { registerUser, loginUser, logoutUser, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.post("/register", upload.single("profilePicture"), registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/checkauth", verifyToken, checkAuth);

export default router;