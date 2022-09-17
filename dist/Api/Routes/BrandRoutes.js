"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BrandController_1 = __importDefault(require("../Controllers/BrandController"));
const router = (0, express_1.Router)();
router.route('/brands').get((...args) => { BrandController_1.default.GetAsync(...args); });
router.route('/brand').get((...args) => { BrandController_1.default.GetByIdAsync(...args); });
router.route('/brand').post((...args) => { BrandController_1.default.CreateAsync(...args); });
router.route('/brand').put((...args) => { BrandController_1.default.UpdateAsync(...args); });
router.route('/brand').delete((...args) => { BrandController_1.default.DeleteAsync(...args); });
router.route('/brands/filtered').get((...args) => { BrandController_1.default.GetBrandsByValue(...args); });
// router.route('/Login').get((...args) => { BrandController.LoginAsync(...args) });
exports.default = router;
