import express from "express";
import { replyController } from "../controllers/comment_reply.controller";
import auth from "../middleware/auth.middleware";

export const replyRouter = express.Router();

replyRouter.post('/reply',auth, replyController.reply);
replyRouter.get('/allreply',auth, replyController.allReply);