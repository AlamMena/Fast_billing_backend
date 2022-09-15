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
const ProductSchema_1 = require("../../Data/Schemas/Inventory/ProductSchema");
const CoreController_1 = require("./CoreController");
class ProductController extends CoreController_1.CoreController {
    constructor(dbModel) {
        super(dbModel);
    }
    GetProductsByValue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { value, isDeleted } = req.query;
                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);
                if (!value) {
                    return res.status(400).send('Value is not valid');
                }
                const parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
                let query = {
                    $and: [
                        {
                            $or: [
                                { name: { '$regex': value === null || value === void 0 ? void 0 : value.toString(), '$options': 'i' } },
                                { price: parsedValue },
                                { cost: parsedValue },
                                { benefit: parsedValue },
                            ]
                        },
                    ]
                };
                if (isDeleted !== "all") {
                    query.$and.push({ IsDeleted: isDeleted });
                }
                let data = yield ProductSchema_1.model.find(query).skip((page - 1) * limit).limit(limit);
                let dataQuantity = yield ProductSchema_1.model.find(query).count();
                return res.send({ data, dataQuantity });
            }
            catch (error) {
                return res.status(500).send({ message: "An error has occurred", error });
            }
        });
    }
}
exports.default = new ProductController(ProductSchema_1.model);
