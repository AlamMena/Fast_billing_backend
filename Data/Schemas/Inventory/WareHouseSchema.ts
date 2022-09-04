import { Schema } from "mongoose";

const WareHouseSchema = new Schema({
    name: { type: String, required: true },
    branchId: { type: Number, required: true },
    description: { type: String, required: true },

    IsDeleted: { type: Boolean },

    CreatedAt: { type: Date },
    CreatedBy: { type: String },

    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },

})

export default WareHouseSchema;