import express, { Router } from 'express';
import { productController } from "../controllers/controller";
import { addProductValidator, updateProductValidator } from "../middleware/joiValidate.middleware";
import { auth, buyerAccess, sellerAccess } from "../middleware/auth.middleware";

class ProductRouter{
    private router:Router
    constructor() {
        this.router = express.Router();
        this.configureRoutes();
    }

    private configureRoutes(): void {
        this.router.get('/category', productController.viewAllCategory);

        this.router.post('/product', addProductValidator, sellerAccess, productController.addProduct);
        this.router.put('/product', updateProductValidator, sellerAccess, productController.updateProduct);
        this.router.delete('/product', sellerAccess, productController.removeProduct);

        this.router.post('/cart', buyerAccess, productController.addToCart);
        this.router.delete('/cart', buyerAccess, productController.removeFromCart);
        this.router.get('/cart', buyerAccess, productController.viewMyCart);
        this.router.put('/cart', buyerAccess, productController.updateQuantity);

        this.router.post('/order', buyerAccess, productController.buy);
        this.router.delete('/order', buyerAccess, productController.cancelOrder);
        this.router.get('/order', buyerAccess, productController.viewMyOrder);

        this.router.post('/search', productController.filter);

        this.router.post('/review', buyerAccess, productController.review);
        this.router.delete('/review', buyerAccess, productController.deleteReview);
    }

    public getRouter(): Router {
        return this.router;
    }
}
export const productRouter=new ProductRouter().getRouter()
