import mongoose, { Model, Schema } from "mongoose";
import CoreModel from "../../Core/CoreModel";

const CategorySchema = new Schema({
    name: { type: String, required: true },

    IsDeleted: { type: Boolean },

    CreatedAt: { type: Date },
    CreatedBy: { type: String },

    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },


});

export const model = mongoose.model('categories', CategorySchema);
export default CategorySchema;