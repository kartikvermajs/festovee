import express, { Router } from "express";
import { loginUser, resetUserPassword, userForgotPassword, UserRegistration, verifyUser } from "../controller/auth.controller";
import { verifyForgotPasswordOtp } from "../utils/auth.helper";

const router: Router = express.Router();

router.post("/user-registration", UserRegistration);
router.post("/verify-user", verifyUser);
router.post("/login-user", loginUser);
router.post("/forgot-password-user", userForgotPassword);
router.post("/reset-password-user", resetUserPassword);
router.post("/verify-forgot-password-user", verifyForgotPasswordOtp);

export default router;
