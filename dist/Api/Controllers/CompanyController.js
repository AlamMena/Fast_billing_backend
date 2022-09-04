"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreController_1 = require("./CoreController");
const CompanySchema_1 = require("../../Data/Schemas/System/CompanySchema");
class CompanyController extends CoreController_1.CoreController {
    constructor(dbModel) {
        super(dbModel);
    }
}
exports.default = new CompanyController(CompanySchema_1.model);
