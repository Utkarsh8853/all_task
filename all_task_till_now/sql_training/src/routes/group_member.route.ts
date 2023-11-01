import express from "express";
import { groupMemberController } from "../controllers/group_member.controller";

export const groupMemberRouter = express.Router();

groupMemberRouter.post('/group_member', groupMemberController.group_member);