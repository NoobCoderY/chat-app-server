import express from "express"
import { login,registerUser,sendOtp,verifyOtp,forgetPassword,resetPassword } from "../controllers/authController.js";


const router = express.Router();


router.post("/login", login)
router.post("/register", registerUser,sendOtp);
router.post("/verify", verifyOtp);
router.post("/send-otp",sendOtp);
router.post("/forgot-password",forgetPassword);
router.post("/reset-password", resetPassword);


export default router