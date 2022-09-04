import mongoose, { Schema, Model, Types } from "mongoose";
//@ts-ignore
import Inc from 'mongoose-sequence';
import CoreEntity from "../../Core/CoreModel";

interface IProduct {
    _id: Types.ObjectId,
    name: string,
    description: String,
    images: Types.Array<String>,
    price: number,
    cost: number,
    tax: number,
    benefit: number,
    quantity: number,
    disccount: number,
    sold: number,
    bought: number,
    categoryId: number,

    InventoryTransactions: IProductInventoryTransaction[],

    IsDeleted: Boolean,

    CreatedAt: Date,
    CreatedBy: String,

    UpdatedAt: Date,
    UpdatedBy: String,
}

interface IProductInventoryTransaction {

    companyId: number,
    branchId: number,
    refId: number,
    date: Date,
    wareHouseId: number,
    cost: number,
    price: number,
    quantity: number,
    sign: number,
    description: String,
    document: String,
    refNo: number,
    refDocNum: number
}

const ProductSchema = new Schema<IProduct>({
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
    quantity: {type: Number, default: 1},

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

const model = mongoose.model<IProduct>('products', ProductSchema);

export { IProduct, model };
export default ProductSchema;