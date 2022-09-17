import mongoose, { Model, Schema } from "mongoose";
import ICoreModel from "../../Core/CoreModel";

const BrandSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },

    IsDeleted: { type: Boolean },

    createdAt: { type: Date },
    createdBy: { type: String },

    updatedAt: { type: Date },
    updatedBy: { type: String },


});

export const model = mongoose.model('brands', BrandSchema);
export default BrandSchema;