import { Schema, model, Document, Model} from 'mongoose';

// Buyer schema

export interface Buyer extends Document {
  name: string;
  email: string;
  password: string;
  ph_no: string;
}
  
const buyerSchema = new Schema<Buyer>({

  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  ph_no: {
    type: String,
  },
},{ timestamps: true });

export default model<Buyer>('buyers', buyerSchema);
// export const BuyerModel: Model<Buyer> = model<Buyer>('Buyer', buyerSchema);