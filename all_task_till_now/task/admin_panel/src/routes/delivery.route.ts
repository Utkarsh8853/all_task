import express, { Router } from 'express';
import { delvieryAccess } from "../middleware/auth.middleware";
import { deliveryController } from "../controllers/controller";

class DeliveryRouter{
    private router:Router

    constructor() {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.put('/delivery', delvieryAccess, deliveryController.orderDelivery);
    }

    public getRouter(): Router {
        return this.router;
    }
}
export const deliveryRouter=new DeliveryRouter().getRouter()