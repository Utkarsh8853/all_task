import express, { Router } from 'express';
import { adminAccess } from '../middleware/auth.middleware';
import { forgetPasswordValidate, setPasswordValidate, userLoginValidate } from '../middleware/joiValidate.middleware';
import { adminAuthController } from '../controllers/controller'
import otpLimit from '../middleware/otp-limit.middleware';

class AdminAuthRouter {
    private router: Router;

    constructor() {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/numberSignin',otpLimit ,adminAuthController.twilioSignin);
        this.router.post('/otpVerify', adminAuthController.otpVerification);
        this.router.get('/googleSignin', adminAuthController.signin);
        this.router.get('/callback', adminAuthController.signinCallback);
        this.router.post('/login', userLoginValidate, adminAuthController.login);
        this.router.get('/logout', adminAccess, adminAuthController.logout);
        this.router.post('/forgetPassword', forgetPasswordValidate, adminAuthController.forgetPassword);
        this.router.post('/setPassword', setPasswordValidate, adminAuthController.setNewPassword);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export const adminAuthRouter = new AdminAuthRouter().getRouter();