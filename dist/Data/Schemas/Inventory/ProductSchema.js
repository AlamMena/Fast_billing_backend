"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ProductSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    images: [String],
    price: { type: Number },
    cost: { type: Number },
    tax: { type: Number, default: 0 },
    benefit: { type: Number },
    sold: { type: Number, default: 0 },
    disccount: { type: Number, default: 0 },
    bought: { type: Number, default: 0 },
    categoryId: { type: Number },
    quantity: { type: Number, default: 1 },
    InventoryTransactions: [{
            companyId: { type: Number, required: true },
            branchId: { type: Number, required: true },
            refId: { type: Number, required: true },
            date: { type: Date, required: true },
            wareHouseId: { type: Number, required: true },
            cost: { type: Number, default: 0 },
            price: { type: Number, default: 0 },
            quantity: { type: Number, default: 0 },
            sign: { type: Number, default: 1 },
            description: { type: String, default: 'N/D' },
            document: { type: String, required: true },
            refNo: { type: Number },
            refDocNum: { type: Number }
        }],
    IsDeleted: { type: Boolean },
    CreatedAt: { type: Date },
    CreatedBy: { type: String },
    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },
});
// ProductSchema.method('validateProductList', async function validateProductList(productList: any[]): IProduct[] {
//     const ids = productList.map((item) => item._id)
//     const productsh = await this.find({ $and: [{ _id: { $in: ids } }, { IsDeleted: true }] });
//     if (productsh.length !== productList.length) {
//         return [];
//     }
//     // return productsh
// });
const model = mongoose_1.default.model('products', ProductSchema);
exports.model = model;
exports.default = ProductSchema;
