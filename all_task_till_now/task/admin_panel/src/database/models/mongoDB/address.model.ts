import { Schema, model, Document} from 'mongoose';

interface Address extends Document {
  house_no: string;
  street_no: string;
  area: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  user_id: string;
}

const addressSchema = new Schema<Address>({
  house_no: {
    type: String,
    required: true,
  },
  street_no: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip_code: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
},{ timestamps: true })

export default model<Address>('addresses', addressSchema);