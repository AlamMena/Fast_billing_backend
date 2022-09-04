import mongoose, { Schema } from "mongoose";
import CoreModel from "../../Core/CoreModel";

const ContactSchema = new Schema({
    name: { type: String, required: true },
    phone: {type: String, required: true},
    address: {type: String, required: true},

    IsDeleted: { type: Boolean },

    CreatedAt: { type: Date },
    CreatedBy: { type: String },

    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },


});

export default ContactSchema;