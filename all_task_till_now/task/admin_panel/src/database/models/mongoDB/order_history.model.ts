import { Schema, model, Document, Types} from 'mongoose';

// Cart schema
export enum status {
    pending = 'pending',
    delivered ='delivered',
    cancelled = 'cancelled' 
}
interface Order extends Document {
  product_id: Types.ObjectId;
  unit_price: number;
  quantity: number;
  delivery_status: string;
}
  
const orderSchema = new Schema<Order>({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    unit_price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    delivery_status: {
        type: String,
        enum: Object.values(status),
        default:"pending"
    },
},{ timestamps: true });

interface userOrderHistory extends Document {
    buyer_id: Types.ObjectId;
    address_id:  Types.ObjectId;
    history: string;
}
const userHistory = new Schema<userOrderHistory>({
    buyer_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    address_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    history: [orderSchema]
},{ timestamps: true });
export default model<Order>('order', userHistory);
