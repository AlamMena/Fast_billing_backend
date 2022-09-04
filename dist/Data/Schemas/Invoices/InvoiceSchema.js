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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.model = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ContactSchema_1 = __importDefault(require("../Contacts/ContactSchema"));
const InvoiceSchema = new mongoose_1.Schema({
    companyId: { type: Number },
    branchId: { type: Number },
    invoiceTypeId: { type: Number },
    // contactInfo
    contactInfo: ContactSchema_1.default,
    // totals
    subTotal: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 },
    taxesAmount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    totalPayed: { type: Number, default: 0 },
    NCF: { type: String },
    NCFExpirationDate: { type: Date },
    details: [{
            name: { type: String },
            productId: { type: mongoose_1.Schema.Types.ObjectId },
            quantity: { type: Number, default: 0 },
            cost: { type: Number, default: 0 },
            discountAmount: { type: Number, default: 0 },
            discount: { type: Number, default: 0 },
            originalPrice: { type: Number, default: 0 },
            price: { type: Number, default: 0 },
            taxes: { type: Number },
            taxesAmount: { type: Number, default: 0 },
            subTotal: { type: Number, default: 0 },
            total: { type: Number, default: 0 }
        }],
    // default
    IsDeleted: { type: Boolean },
    CreatedAt: { type: Date },
    CreatedBy: { type: String },
    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },
});
const model = mongoose_1.default.model('invoices', InvoiceSchema);
exports.model = model;
exports.default = InvoiceSchema;
