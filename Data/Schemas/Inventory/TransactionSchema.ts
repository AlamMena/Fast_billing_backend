import { Schema } from "mongoose";

const TransactionSchema = new Schema({

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

})

export default TransactionSchema;