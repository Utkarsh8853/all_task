import express from "express";
import { groupChatController } from "../controllers/group_chat.controller";
import authMiddleware from "../middleware/auth.middleware";
export const groupChatRouter = express.Router();

groupChatRouter.delete('/group_chat',authMiddleware, groupChatController.group_chat);