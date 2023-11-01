import express, { Router } from 'express';
import { dashboardController } from "../controllers/controller";
import {auth} from "../middleware/auth.middleware";
import { addAddressValidation, setPasswordValidate, updateAddressValidation, updateProfileValidate } from "../middleware/joiValidate.middleware";

class DashboardRouter{
    private router!:Router
    constructor(){
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.put('/profile', updateProfileValidate, auth, dashboardController.updateProfile);
        this.router.get('/profile', auth, dashboardController.viewProfile);
        this.router.delete('/profile', auth, dashboardController.deleteAccount);

        this.router.post('/address', addAddressValidation, auth, dashboardController.addAddress);
        this.router.put('/address', updateAddressValidation, auth, dashboardController.updateAddress);
        this.router.get('/address', auth, dashboardController.allAddress);
        this.router.delete('/address', auth, dashboardController.deleteAddress);

        this.router.put('/password', setPasswordValidate, auth, dashboardController.updatePassword);
    }

    public getRouter(): Router {
        return this.router;
    }
}
export const dashboardRouter=new DashboardRouter().getRouter();


