import express from "express";
import { groupChatMessagesController } from "../controllers/group_chat_messages.controller";

export const groupChatMessagesRouter = express.Router();

groupChatMessagesRouter.post('/group_chat_messages', groupChatMessagesController.group_chat_messages);