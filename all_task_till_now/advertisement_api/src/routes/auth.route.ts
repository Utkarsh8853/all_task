import express from "express";
import { authController } from "../controllers/auth.controller";
import auth from "../middleware/auth.middleware";

export const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/logout',auth, authController.logout );
authRouter.get('/forgetPassword', authController.forgetPassword);
authRouter.put('/setPassword', authController.setNewPassword);