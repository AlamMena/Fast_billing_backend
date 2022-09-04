"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CoreController_1 = require("./CoreController");
const InvoiceSchema_1 = require("../../Data/Schemas/Invoices/InvoiceSchema");
const ProductSchema_1 = require("../../Data/Schemas/Inventory/ProductSchema");
const ContactSchema_1 = require("../../Data/Schemas/Contacts/ContactSchema");
class InvoiceController extends CoreController_1.CoreController {
    constructor(dbModel) {
        super(dbModel);
    }
    CalculateInvoice(invoice) {
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
    CalculateInvoiceAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let invoice = new InvoiceSchema_1.model(req.body);
            let invoiceResponse = this.CalculateInvoice(invoice);
            res.status(200).send(invoiceResponse);
        });
    }
    CreateAsync(req, res, next) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let invoiceReq = req.body;
                let invoice = new InvoiceSchema_1.model(invoiceReq);
                // validating contact
                const contact = yield ContactSchema_1.model.findOne({ $and: [{ _id: invoice.contactInfo._id }, { IsDeleted: false }] });
                if (!contact) {
                    return res.status(400).send({ Message: "Invalid contact" });
                }
                // setting contact info 
                invoice.contactInfo = contact;
                // validatig products
                const productIds = invoice.details.map((detail) => detail.productId);
                const products = yield ProductSchema_1.model.find({ $and: [{ _id: { $in: productIds } }, { IsDeleted: false }] });
                if (products.length !== productIds.length) {
                    return res.status(400).send({ Message: "Invalid products" });
                }
                for (let detail of invoice.details) {
                    // product
                    var productDb = products.find(product => product._id.toString() == detail.productId.toString());
                    detail.name = (_a = productDb === null || productDb === void 0 ? void 0 : productDb.name) !== null && _a !== void 0 ? _a : "";
                    // subtotal 
                    detail.price = detail.price === 0 ? (_b = productDb === null || productDb === void 0 ? void 0 : productDb.price) !== null && _b !== void 0 ? _b : 0 : detail.price;
                    // taxes
                    detail.tax = (_c = productDb === null || productDb === void 0 ? void 0 : productDb.tax) !== null && _c !== void 0 ? _c : 0;
                    // disccount
                    detail.discount = detail.discount === 0 ? (_d = productDb === null || productDb === void 0 ? void 0 : productDb.disccount) !== null && _d !== void 0 ? _d : 0 : (_e = detail.discount) !== null && _e !== void 0 ? _e : 0;
                    // build inventory transaction 
                    productDb === null || productDb === void 0 ? void 0 : productDb.InventoryTransactions.push({
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
                    yield (productDb === null || productDb === void 0 ? void 0 : productDb.save());
                }
                this.CalculateInvoice(invoice);
                yield (invoice === null || invoice === void 0 ? void 0 : invoice.save());
                return res.send(invoice);
            }
            catch (error) {
                return res.status(500).send(error);
            }
        });
    }
}
exports.default = new InvoiceController(InvoiceSchema_1.model);
