import mongoose, { Schema, Model } from "mongoose";
import CoreModel from "../../Core/CoreModel";
import CoreEntity from "../../Core/CoreModel";

const CompanySchema = new Schema({
    Name: { type: String, required: true },
    Identification: { type: String, required: true },
    Address: { type: String, required: true },
    PhoneNumber: { type: String, required: true },

    IsDeleted: { type: Boolean },

    CreatedAt: { type: Date },
    CreatedBy: { type: String },

    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },


});

export const model = mongoose.model('companies', CompanySchema)
export default CompanySchema;