import express, { Router } from "express";
import { UserRegistration } from "../controller/auth.controller";

const router: Router = express.Router();

router.post("/user-registration", UserRegistration);

export default router;
