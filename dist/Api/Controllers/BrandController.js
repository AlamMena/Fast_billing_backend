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
const BrandSchema_1 = require("../../Data/Schemas/System/BrandSchema");
class BrandController extends CoreController_1.CoreController {
    constructor(brandModel) {
        super(brandModel);
    }
    GetBrandsByValue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { value, isDeleted } = req.query;
                const page = parseInt(req.query.page);
                const limit = parseInt(req.query.limit);
                let query = {
                    $and: [
                        { name: { '$regex': value === null || value === void 0 ? void 0 : value.toString(), '$options': 'i' } },
                    ]
                };
                if (isDeleted !== "all") {
                    query.$and.push({ IsDeleted: isDeleted });
                }
                let data = yield BrandSchema_1.model.find(query).skip((page - 1) * limit).limit(limit);
                let dataQuantity = yield BrandSchema_1.model.find(query).count();
                return res.send({ data, dataQuantity });
            }
            catch (error) {
                return res.status(500).send({ message: "An error has occurred", error });
            }
        });
    }
}
exports.default = new BrandController(BrandSchema_1.model);
