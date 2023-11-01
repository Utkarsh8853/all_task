import express, { Router } from 'express';
import {buyerAccess} from "../middleware/auth.middleware";
import { chatbotController } from "../controllers/controller";

class ChatbotRouter{
    private router:Router
    constructor() {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.post('/order', buyerAccess, chatbotController.Order);
        this.router.post('/orderById', buyerAccess, chatbotController.OrderById);
    }

    public getRouter(): Router {
        return this.router;
    }
}
export const chatbotRouter=new ChatbotRouter().getRouter()