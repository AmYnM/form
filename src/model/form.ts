import mongoose, { Schema, Document } from "mongoose";

// Define interface for address
export interface IAddress {
  street: string;
  city: string;
  country: string;
  isDefault: boolean;
}

// Define interface for form document
export interface IForm extends Document {
  name: string;
  age: number;
  addresses: IAddress[];
}

// Define schema for address
const AddressSchema: Schema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, required: true }
});

// Define schema for form
const FormSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  addresses: { type: [AddressSchema], required: true }
});

// Define model for form
const Form = mongoose.model<IForm>("Form", FormSchema);

export default Form;
