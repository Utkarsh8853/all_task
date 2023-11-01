import express from "express";
import { postController } from "../controllers/post.controller";
import auth from "../middleware/auth.middleware";

export const postRouter = express.Router();

/**
 * @swagger
 * /data/post:
 *   post:
 *     summary: Upload post
 *     description: Upload multiple post.
 *     tags: [Post]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: string
 *                 required: true
 *               caption:
 *                 type: string
 *                 required: false
 *     responses:
 *       200:
 *         description: Successful signup
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
postRouter.post('/post',auth, postController.post);