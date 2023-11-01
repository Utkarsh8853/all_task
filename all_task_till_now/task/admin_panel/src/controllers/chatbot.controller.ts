import { Request,Response } from "express";
import { chatbotService } from "../services/chatbot.service";
import { UserAuthRequest } from "../interfaces/customRequest.interface";


class ChatbotController {

    async Order (req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;;
            let result
            try {
                result = await chatbotService.myOrder(user_id);
            } catch (error) {
                return res.send([{"message": "There is no order in your history"}]);
            }
            console.log("///////",result);
            
            const payload = await chatbotService.generatePayload(result);
            console.log(payload);
            
            res.send([{
                "message": "Your order history"
            }, {
                "message": "For more order info choose product",
                "metadata": {
                "contentType": "300",
                    "templateId": "6",
                    "payload": payload
                }
            }])

        } catch(err) {
            console.error(err);
            return res.status(400).send(`Server problem`);
        }
    }

    async OrderById (req:Request, res:Response) {
        try {
            const userData = (req as UserAuthRequest).userData;
            const user_id = userData.id;;
            const order_id = req.body.message
            let result
            try {
                result = await chatbotService.findOrderById(user_id,order_id);
            } catch (error) {
                return res.send([{"message": "I don't understand what you say"}]);
            }
            const product_name = await chatbotService.productName(result.product_id);
            const address_detail = await chatbotService.address(user_id,result.address_id);
            console.log(result);
            console.log("///",product_name);
            console.log("=====",address_detail);
            return res.send([
                {"message": "Your order details"},
                {"message": `Product name: ${product_name}`}, 
                {"message": `Product cost: ${result.unit_price}`},
                {"message": `delivery_status: ${result.delivery_status}`},
                {"message": `Order Quantity: ${result.quantity}`},
                {"message": `Delivery address: house_no: ${address_detail.house_no}\nstreet_no: ${address_detail.street_no}\narea: ${address_detail.area}\ncity: ${address_detail.city}\nstate: ${address_detail.state}\nzip_code: ${address_detail.zip_code}`},
            ])

        } catch(err) {
            console.error(err);
            return res.status(400).send(`I don't understand what you say`);
        }
    }
 
}
export const chatbotController = new ChatbotController();
