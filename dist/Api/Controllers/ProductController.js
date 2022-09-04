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
            let { value } = req.query;
            let response = yield ProductSchema_1.model.find({ name: { $in: value } });
            console.log(value);
            res.send(response);
        });
    }
}
exports.default = new ProductController(ProductSchema_1.model);
