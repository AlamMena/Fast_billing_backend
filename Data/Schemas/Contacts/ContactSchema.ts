import mongoose, { Schema, Model, Types } from "mongoose";
import CoreModel from "../../Core/CoreModel";

interface IContact {
    _id: Types.ObjectId,
    name: String,
    phone: String,
    address: String,
    noIdentification: String,
    type: String,
    imageUrl: String,

    IsDeleted: Boolean,

    CreatedAt: Date,
    CreatedBy: String,

    UpdatedAt: Date,
    UpdatedBy: String,
}
const ContactSchema = new Schema<IContact>({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    noIdentification: { type: String, require: true },
    type: { type: String, required: true },
    imageUrl: { type: String, required: false },

    IsDeleted: { type: Boolean },

    CreatedAt: { type: Date },
    CreatedBy: { type: String },

    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },


});
export const model = mongoose.model('contacts', ContactSchema)
export { IContact }
export default ContactSchema;