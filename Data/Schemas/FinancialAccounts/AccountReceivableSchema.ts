import { Schema } from "mongoose";

const AccountReceivableSchema = new Schema({
    companyId: { type: Number, required: true },
    branchId: { type: Number, required: true },

    // NCF info
    NCFTypeId: { type: Number },
    NCF: { type: String },

    // invoice info
    date: { type: Date, required: true },
    expirationDate: { type: Date },

    // references
    refId: { type: String, required: true },
    refNo: { type: String, required: true },

    contactInfo: {
        contactId: { type: Number },
        contacName: { type: String },
        contactIdentificationNo: { type: String },
        contactClasification: { type: Number }
    },

    subTotal: { type: Number, default: 0 },
    disccountAmount: { type: Number, default: 0 },
    taxesAmount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },

    document: { type: String },

    transactions: [{
        Amount: { type: Number, default: 0 },
        Date: { type: Date },
        sign: { type: Number },
        document: { type: String },
        refNo: { type: Number }
    }],

    // default
    IsDeleted: { type: Boolean },
    CreatedAt: { type: Date },
    CreatedBy: { type: String },
    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },
})