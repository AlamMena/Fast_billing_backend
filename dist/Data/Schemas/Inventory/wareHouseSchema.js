"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WareHouseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    branchId: { type: Number, required: true },
    description: { type: String, required: true },
    IsDeleted: { type: Boolean },
    CreatedAt: { type: Date },
    CreatedBy: { type: String },
    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },
});
exports.default = WareHouseSchema;
