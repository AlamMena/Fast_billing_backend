"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = __importDefault(require("../Controllers/ProductController"));
const router = (0, express_1.Router)();
router.route('/products').get((...args) => { ProductController_1.default.GetAsync(...args); });
router.route('/product').get((...args) => { ProductController_1.default.GetByIdAsync(...args); });
router.route('/product').post((...args) => { ProductController_1.default.CreateAsync(...args); });
router.route('/product').put((...args) => { ProductController_1.default.UpdateAsync(...args); });
router.route('/product').delete((...args) => { ProductController_1.default.DeleteAsync(...args); });
router.route('/products/filtered').get((...args) => { ProductController_1.default.GetProductsByValue(...args); });
exports.default = router;
