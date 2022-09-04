"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const InvoiceController_1 = __importDefault(require("../Controllers/InvoiceController"));
const router = (0, express_1.Router)();
router.route('/invoices').get((...args) => { InvoiceController_1.default.GetAsync(...args); });
router.route('/invoice').get((...args) => { InvoiceController_1.default.GetByIdAsync(...args); });
router.route('/invoice').post((...args) => { InvoiceController_1.default.CreateAsync(...args); });
router.route('/invoice').put((...args) => { InvoiceController_1.default.UpdateAsync(...args); });
router.route('/invoice').delete((...args) => { InvoiceController_1.default.DeleteAsync(...args); });
router.route('/invoice/calculate').post((...args) => { InvoiceController_1.default.CalculateInvoiceAsync(...args); });
exports.default = router;
