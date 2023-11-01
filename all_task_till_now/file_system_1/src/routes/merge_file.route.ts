import express from "express";
import { mergedController } from "../controller/merge _file.controller";

export const mergedRouter = express.Router();

mergedRouter.post('/merged', mergedController.merged);