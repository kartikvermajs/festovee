import express, { Router } from "express";
import { UserRegistration, verifyUser } from "../controller/auth.controller";

const router: Router = express.Router();

router.post("/user-registration", UserRegistration);
router.post("/verify-user", verifyUser);

export default router;
