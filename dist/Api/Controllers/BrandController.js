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
const AuthenticationMiddleware_1 = require("../../Middlewares/AuthenticationMiddleware");
class BrandController extends CoreController_1.CoreController {
    constructor(brandModel) {
        super(brandModel);
    }
    LoginAsync(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, AuthenticationMiddleware_1.Login)();
            return res.send(response);
        });
    }
}
exports.default = new BrandController(BrandSchema_1.model);
