import express from "express";
import { deleteController } from "../controllers/delete_all_chats.controller";

export const deleteAllMessagesRouter = express.Router();

deleteAllMessagesRouter.post('/delete_all_messages', deleteController.delete_all_chats);