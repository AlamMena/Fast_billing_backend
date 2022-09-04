"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    images: { type: Array },
    price: { type: Number },
    cost: { type: Number },
    tax: { type: Number, default: 0 },
    benefit: { type: Number },
    sold: { type: Number, default: 0 },
    bought: { type: Number, default: 0 },
    categoryId: { type: Number },
    // 
    IsDeleted: { type: Boolean },
    CreatedAt: { type: Date },
    CreatedBy: { type: String },
    UpdatedAt: { type: Date },
    UpdatedBy: { type: String }
});
exports.default = ProductSchema;
