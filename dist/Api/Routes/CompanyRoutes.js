"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CompanyController_1 = __importDefault(require("../Controllers/CompanyController"));
const router = (0, express_1.Router)();
router.route('/companies').get((...args) => { CompanyController_1.default.GetAsync(...args); });
router.route('/companies').get((...args) => { CompanyController_1.default.GetByIdAsync(...args); });
router.route('/company').post((...args) => { CompanyController_1.default.CreateAsync(...args); });
router.route('/company').put((...args) => { CompanyController_1.default.UpdateAsync(...args); });
router.route('/company').delete((...args) => { CompanyController_1.default.DeleteAsync(...args); });
exports.default = router;
