import { Schema, model, Document } from 'mongoose';

// Seller schema
export interface Seller extends Document {
  name: string;
  email: string;
  password: string;
  ph_no: string;
  admin_approval: boolean;
}
  
const sellerSchema = new Schema<Seller>({

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    expires: 20
  },
  password: {
    type: String,
  },
  ph_no: {
    type: String,
  },
  admin_approval:{
    type: Boolean,
    default: false
  }
},{ timestamps: true });

export default model<Seller>('sellers', sellerSchema);
