import { Router } from "express";
import { registerUser, loginUser, logoutUser, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/checkauth", verifyToken, checkAuth);

export default router;