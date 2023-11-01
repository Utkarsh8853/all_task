import express from "express";
import { productController } from "../controllers/product.controller";
import auth from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

export const productRouter = express.Router();

productRouter.post('/addProduct', auth, productController.addProduct);
productRouter.get('/viewProduct', auth, productController.viewProduct);
productRouter.post('/addProductImage', auth, upload.single('photo'),auth,productController.addProductImage);
productRouter.put('/bidding', auth, productController.bidding);
productRouter.put('/updateProduct', auth, productController.updateProduct);
productRouter.delete('/remove', auth, productController.removeProduct);
productRouter.delete('/removeProductImage', auth, productController.removeProductImage);