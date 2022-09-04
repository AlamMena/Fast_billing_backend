import mongoose, { Schema, Model, Types } from "mongoose";
import ContactSchema, { IContact } from "../Contacts/ContactSchema";

interface IInvoiceDetail {
    name: String,
    productId: Types.ObjectId,
    quantity: number,
    cost: number,
    originalPrice: number,
    price: number,
    tax: number,
    taxesAmount: number,
    discount: number,
    discountAmount: number,
    subTotal: number,
    total: number
}

interface IInvoice {

    companyId: number,
    branchId: number,
    invoiceTypeId: number,

    // totals
    subTotal: number,
    discountAmount: number,
    taxesAmount: number,
    total: number,
    totalPayed: number,

    NCF: string,
    NCFExpirationDate: Date,

    details: IInvoiceDetail[],

    // contactInfo
    contactInfo: IContact,

    // default
    IsDeleted: boolean,
    CreatedAt: Date,
    CreatedBy: string,
    UpdatedAt: Date,
    UpdatedBy: string,

}
const InvoiceSchema = new Schema<IInvoice>({

    companyId: { type: Number },
    branchId: { type: Number },
    invoiceTypeId: { type: Number },

    // contactInfo
    contactInfo: ContactSchema,

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
        productId: { type: Schema.Types.ObjectId },
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

})

const model = mongoose.model<IInvoice>('invoices', InvoiceSchema)

export { model, IInvoice }

export default InvoiceSchema;