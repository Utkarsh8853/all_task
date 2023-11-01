import express from "express";
import { groupController } from "../controllers/group.controller";

export const groupRouter = express.Router();

groupRouter.post('/group', groupController.group);