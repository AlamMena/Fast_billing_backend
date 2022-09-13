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
const ContactSchema_1 = require("../../Data/Schemas/Contacts/ContactSchema");
class ContactController extends CoreController_1.CoreController {
    constructor(dbModel) {
        super(dbModel);
    }
    GetContactsByValue(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { value, status, type } = req.query;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            let query = {
                $and: [
                    {
                        $or: [
                            { name: { '$regex': value, '$options': 'i' } },
                            { noIdentification: { '$regex': value, '$options': 'i' } },
                            { phone: { '$regex': value, '$options': 'i' } }
                        ]
                    },
                    { IsDeleted: false },
                    { type: type }
                ]
            };
            let data = yield ContactSchema_1.model.find(query).skip((page - 1) * limit).limit(limit);
            let dataQuantity = yield ContactSchema_1.model.find(query).count();
            res.send({ data, dataQuantity });
        });
    }
}
exports.default = new ContactController(ContactSchema_1.model);
