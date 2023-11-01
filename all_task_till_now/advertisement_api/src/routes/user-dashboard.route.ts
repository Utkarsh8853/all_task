import express from "express";
import { dashboardController } from "../controllers/user-dashboard.controller";
import auth from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

export const dashboardRouter = express.Router();

dashboardRouter.post('/updatePhoto',auth,upload.single('photo'),auth ,dashboardController.uploadProfilePhoto);
dashboardRouter.put('/updateProfile', auth, dashboardController.updateProfile);
dashboardRouter.post('/addAddress', auth, dashboardController.addAddress);
dashboardRouter.get('/allAddress', auth, dashboardController.allAddress);
dashboardRouter.delete('/deleteAddress', auth, dashboardController.deleteAddress);
dashboardRouter.put('/updatePassword', auth, dashboardController.updatePassword);
dashboardRouter.put('/updateAddress', auth, dashboardController.updateAddress);
dashboardRouter.get('/viewProfile', auth, dashboardController.viewProfile);
dashboardRouter.delete('/deleteAccount', auth, dashboardController.deleteAccount);