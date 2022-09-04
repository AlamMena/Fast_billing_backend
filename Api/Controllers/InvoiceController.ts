import { model, Model } from "mongoose";
import { CoreController } from "./CoreController";
import { model as invoiceModel, IInvoice } from '../../Data/Schemas/Invoices/InvoiceSchema'
import { IProduct, model as productModel } from '../../Data/Schemas/Inventory/ProductSchema'
import { model as contactModel } from '../../Data/Schemas/Contacts/ContactSchema'
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { defaultMaxListeners } from "events";

class InvoiceController extends CoreController {
    constructor(dbModel: Model<any>) {
        super(dbModel)
    }


    private CalculateInvoice(invoice: IInvoice): IInvoice {

        for (let detail of invoice.details) {

            // subtotal 
            detail.subTotal = detail.price * detail.quantity;

            // taxes
            detail.taxesAmount = detail.subTotal * detail.tax;

            // disccount
            detail.discountAmount = detail.subTotal * (detail.discount / 100);

            // total 
            detail.total = detail.subTotal - detail.discount + detail.taxesAmount;

        }
        // header 
        invoice.subTotal = invoice.details.reduce((prev, curr) => curr.subTotal + prev, 0);
        invoice.discountAmount = invoice.details.reduce((prev, curr) => curr.discountAmount + prev, 0);
        invoice.total = invoice.details.reduce((prev, curr) => curr.total + prev, 0);

        return invoice;
    }

    async CalculateInvoiceAsync(req: Request, res: Response, next: NextFunction) {

        let invoice = new invoiceModel(req.body as IInvoice)
        let invoiceResponse = this.CalculateInvoice(invoice);
        res.status(200).send(invoiceResponse)
    }
    override async CreateAsync(req: Request, res: Response, next: NextFunction) {

        try {

            let invoiceReq = req.body as IInvoice;

            let invoice = new invoiceModel(invoiceReq)

            // validating contact
            const contact = await contactModel.findOne({ $and: [{ _id: invoice.contactInfo._id }, { IsDeleted: false }] });
            if (!contact) {
                return res.status(400).send({ Message: "Invalid contact" })
            }
            // setting contact info 
            invoice.contactInfo = contact;

            // validatig products
            const productIds = invoice.details.map((detail) => detail.productId);
            const products = await productModel.find({ $and: [{ _id: { $in: productIds } }, { IsDeleted: false }] });

            if (products.length !== productIds.length) {
                return res.status(400).send({ Message: "Invalid products" });
            }

            for (let detail of invoice.details) {

                // product
                var productDb = products.find(product => product._id.toString() == detail.productId.toString());

                detail.name = productDb?.name ?? "";

                // subtotal 
                detail.price = detail.price === 0 ? productDb?.price ?? 0 : detail.price;

                // taxes
                detail.tax = productDb?.tax ?? 0;

                // disccount
                detail.discount = detail.discount === 0 ? productDb?.disccount ?? 0 : detail.discount ?? 0;

                // build inventory transaction 
                productDb?.InventoryTransactions.push(
                    {
                        companyId: 1,
                        branchId: 1,
                        refId: 1,
                        date: new Date(),
                        wareHouseId: 1,
                        cost: 0,
                        price: 0,
                        quantity: 0,
                        sign: -1,
                        description: "",
                        document: "IN",
                        refNo: 0,
                        refDocNum: 1
                    });
                await productDb?.save();
            }

            this.CalculateInvoice(invoice);

            await invoice?.save();

            return res.send(invoice);

        } catch (error) {
            return res.status(500).send(error);
        }

    }
}
export default new InvoiceController(invoiceModel);