import express, { Router } from "express";
import { loginUser, resetUserPassword, userForgotPassword, UserRegistration, verifyUser, verifyUserForgotPassword,  } from "../controller/auth.controller";

const router: Router = express.Router();

router.post("/user-registration", UserRegistration);
router.post("/verify-user", verifyUser);
router.post("/login-user", loginUser);
router.post("/forgot-password-user", userForgotPassword);
router.post("/reset-user-password", resetUserPassword);
router.post("/verify-forgot-password-user", verifyUserForgotPassword);

export default router;
