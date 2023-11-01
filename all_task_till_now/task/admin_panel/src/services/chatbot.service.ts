import { ObjectId } from "mongodb";
import productModel from "../database/models/mongoDB/product.model";
import buyersModel from "../database/models/mongoDB/buyers.model";
import order_historyModel from "../database/models/mongoDB/order_history.model";

class ChatbotService {

    async viewName (_id:string) {
        const result:any = await buyersModel.findOne({_id: _id})
        return result.name;
    }

    async myOrder (id:string) {
        const result :  any = await order_historyModel.findOne({buyer_id:id})
        return result.history;
    }

    async generatePayload(history: any[]) {
        const payload = [];
        for (const entry of history) {
            const payloadEntry = {
                title: `Order ID: ${entry._id}`,
                message: `${entry._id}`,
            };
            payload.push(payloadEntry);
        }
        return payload;
    }

    async viewOrder (user_id: string, order_id: string) {
        const result:any = await order_historyModel.findOne({buyer_id: user_id,'history._id':order_id})
        return result;
    }

    async findOrderById (user_id: string, order_id: string) {
        const pipeline = [
            { $match: { buyer_id: new ObjectId(user_id) } },
            { $match: { "history._id": new ObjectId(order_id) } },
            { $unwind: "$history" },
            { $match: { "history._id": new ObjectId(order_id) } },
            { $project: {_id:0,"history.product_id":1, "history.delivery_status":1, "history.quantity":1, "history.unit_price":1, "history.address_id":1}}
        ];
        const matchResult = await order_historyModel.aggregate(pipeline);
        return matchResult[0].history;
    }
    
    async productName (id:string) {
        const result :  any = await productModel.findOne({_id:id})
        return result.name;
    }

    async address (user_id: string, address_id: string) {
        const pipeline = [
            { $match: { _id: new ObjectId(user_id) } },
            { $match: { "address._id": new ObjectId(address_id) } },
            { $unwind: "$address" },
            { $match: { "address._id": new ObjectId(address_id) } },
            { $project: {_id:0, "address.house_no":1, "address.street_no":1, "address.area":1, "address.city":1, "address.state":1, "address.zip_code":1}}
        ];
        const matchResult = await buyersModel.aggregate(pipeline);
        return matchResult[0].address;
    }
}
export const chatbotService = new ChatbotService()
