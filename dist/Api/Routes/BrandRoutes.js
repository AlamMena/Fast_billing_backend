"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BrandController_1 = __importDefault(require("../Controllers/BrandController"));
const router = (0, express_1.Router)();
router.route('/Brands').get((...args) => { BrandController_1.default.GetAsync(...args); });
router.route('/Brand').get((...args) => { BrandController_1.default.GetByIdAsync(...args); });
router.route('/Brand').post((...args) => { BrandController_1.default.CreateAsync(...args); });
router.route('/Brand').put((...args) => { BrandController_1.default.UpdateAsync(...args); });
router.route('/Brand').delete((...args) => { BrandController_1.default.DeleteAsync(...args); });
// router.route('/Login').get((...args) => { BrandController.LoginAsync(...args) });
exports.default = router;
