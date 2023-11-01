import Product from "../database/models/product.model";
import fs from "fs";
import Image from "../database/models/image.model";

class ProductController {

    async addProduct(req:any, res:any) {
        try {
            const user_id = req.body.id;
            const {name, description, base_price, category_id, address_id } = req.body;
                const result = await Product.create({name: name, description:description, base_price:base_price,bidding_price:base_price,bidding_user_id:user_id,category_id:category_id, address_id:address_id,seller_id:user_id});
                console.log('Product added',result);
                return res.status(200).json({result: "product added"});
        } catch(err) {
            console.error(err);
            return res.status(200).json({result: "Please send proper detail"});
        }
    }

    async addProductImage(req:any, res:any) {
        try {
            const {product_id} = req.body;
            const user_id = req.body.id;
            console.log(req.file.buffer);
            const file = req.file;
            const fileData = fs.readFileSync(file.path);
            const bufferData = Buffer.from(fileData);
            console.log(bufferData);
            await Image.create({image :bufferData, user_id:user_id, product_id:product_id});
            const path1 = '/home/appinventiv/Desktop/advertisement_system/src/uploads/photo.png';
            fs.unlink(path1, (data) => {
                console.log("File deleted");
            });
            return res.status(200).send("Product image uploaded");  
        } catch(err) {
            console.error(err);
            return res.status(200).send("Product image is not uploaded");
        }
    }

    async viewProduct(req:any, res:any) {
        try {
            const {id} = req.body;
            const result: any = await Product.findOne({where:{id: id}});
                console.log('Product added',result);
                return res.status(200).json({result});
        } catch(err) {
            console.error(err);
            return res.status(200).json({result: "wrong product id"});
        }
    }

    async bidding(req:any, res:any) {
        try {
            const user_id =req.body.id;
            const {product_id,new_bidding_price} = req.body;
            const check1:any = await Product.findOne({where:{id: product_id}});
            console.log("check1  ",check1);
            
            if(check1){
                const check2:any = await Product.findOne({where:{id: product_id,seller_id:user_id}});
                console.log("check2  ",check2);
                if(check2){
                    return res.status(400).send("You cannot bid on your own product")
                }
                else if(check1.bidding_price>=new_bidding_price){
                    return res.status(400).send("bidding prize must greater than base price")
                }
                const result = await Product.update({bidding_price: new_bidding_price, bidding_user_id : user_id},{where: {id:product_id}});
                console.log('Bidding done ',result);
                return res.status(200).send("Bidding done")
            }
            return res.status.send("Worng user id")
        } catch(err) {
            console.error(err);
            return res.status(200).json({result: "wrong product id"});
        }
    }

    async removeProduct(req:any, res:any) {
        try {
            const {product_id} = req.body;
            await Product.destroy({where:{id:product_id}})
            try {
                await Image.destroy({where:{product_id:product_id}})
            } catch (error) {
                return res.status(200).send('Product removed');
            }
            return res.status(200).send('Product removed');

        } catch(err) {
            console.error(err);
            return res.status(400).send('wrong product id');
        }
    }

    async updateProduct(req:any, res:any) {
        try {
            const product_id = req.body;
            const {name, description, base_price, category_id, address_id} = req.body;
            await Product.update({name: name, description:description, base_price:base_price,category_id:category_id, address_id:address_id},{where: {id:product_id}});
            return res.status(200).send('Profile updated');

        } catch(err) {
            console.error(err);
            return res.status(400).send('provide proper information');
        }
    }

    async removeProductImage(req:any, res:any) {
        try {
            const {image_id} = req.body;
            await Image.destroy({where:{id:image_id}})
            return res.status(200).send('Product image removed');

        } catch(err) {
            console.error(err);
            return res.status(400).send('wrong image id');
        }
    }
    
}

export const productController = new ProductController();