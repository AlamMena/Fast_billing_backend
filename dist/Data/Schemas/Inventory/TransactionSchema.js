"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TransactionSchema = new mongoose_1.Schema({
    companyId: { type: Number, required: true },
    branchId: { type: Number, required: true },
    refId: { type: Number, required: true },
    date: { type: Date, required: true },
    wareHouseId: { type: Number, required: true },
    productId: { type: Number },
    cost: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    quantity: { type: Number, default: 0 },
    sign: { type: Number, default: 1 },
    description: { type: String, default: 'N/D' },
    document: { type: String, required: true },
    refNo: { type: Number },
    refDocNum: { type: Number }
});
exports.default = TransactionSchema;
