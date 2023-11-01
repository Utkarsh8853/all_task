import express, { Router } from 'express';
import { authController } from "../controllers/controller";
import {auth} from "../middleware/auth.middleware";
import { forgetPasswordValidate, newUserValidate, setPasswordValidate, userLoginValidate } from "../middleware/joiValidate.middleware";
import otpLimit from "../middleware/otp-limit.middleware";


class AuthRouter{
    private router:Router
    constructor(){
        this.router = express.Router();
        this.configureRoutes();
    }
    private configureRoutes(): void {
        this.router.post('/numberSignin', otpLimit, authController.twilioSignin );
        this.router.post('/otpVerify', authController.otpVerification );
        this.router.get('/googleSignin', authController.signin);
        this.router.get('/callback', authController.signinCallback );
        this.router.post('/signup',newUserValidate, authController.signup);
        this.router.post('/login',userLoginValidate, authController.login);
        // this.router.get('/logout',auth, authController.logout );
        this.router.get('/forgetPassword', otpLimit, forgetPasswordValidate, authController.forgetPassword);
        this.router.put('/setPassword', setPasswordValidate, authController.setNewPassword);
    }

    public getRouter(): Router {
        return this.router;
    }
}
export const authRouter=new AuthRouter().getRouter()