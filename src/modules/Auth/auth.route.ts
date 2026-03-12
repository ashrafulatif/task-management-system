import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequest } from "@/middlewares/validateRequest";
import { authValidationSchema } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(authValidationSchema.registerSchema),
  AuthController.register,
);

router.post(
  "/login",
  validateRequest(authValidationSchema.loginSchema),
  AuthController.login,
);

export const AuthRoutes = router;
