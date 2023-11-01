import express, { Router } from 'express';
import { adminAccess} from "../middleware/auth.middleware";
import { adminController } from "../controllers/controller";



class AdminRouter{
    private router :Router
    constructor(){
        this.router = express.Router();
        this.configureRoutes();
    }
    
    private configureRoutes(): void {
        this.router.post('/category', adminAccess, adminController.addCategory);
        this.router.put('/category', adminAccess, adminController.updateCategoryName);
        this.router.delete('/category', adminAccess, adminController.removeCategory);

        this.router.put('/seller', adminAccess, adminController.verifySeller);
        this.router.get('/seller', adminAccess, adminController.viewAllSeller);
        this.router.delete('/seller', adminAccess, adminController.removeSeller);

        this.router.get('/buyer', adminAccess, adminController.viewAllBuyer);
    }

    public getRouter(): Router {
        return this.router;
    }
}
export const adminRouter=new AdminRouter().getRouter()