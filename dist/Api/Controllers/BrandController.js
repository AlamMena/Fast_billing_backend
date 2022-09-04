"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreController_1 = require("./CoreController");
const BrandSchema_1 = require("../../Data/Schemas/System/BrandSchema");
class BrandController extends CoreController_1.CoreController {
    constructor(brandModel) {
        super(brandModel);
    }
}
exports.default = new BrandController(BrandSchema_1.model);
