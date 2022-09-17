"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CategoryController_1 = __importDefault(require("../Controllers/CategoryController"));
const router = (0, express_1.Router)();
router.route('/Categories').get((...args) => { CategoryController_1.default.GetAsync(...args); });
router.route('/Category').get((...args) => { CategoryController_1.default.GetByIdAsync(...args); });
router.route('/Category').post((...args) => { CategoryController_1.default.CreateAsync(...args); });
router.route('/Category').put((...args) => { CategoryController_1.default.UpdateAsync(...args); });
router.route('/Category').delete((...args) => { CategoryController_1.default.DeleteAsync(...args); });
router.route('/categories/filtered').get((...args) => { CategoryController_1.default.GetCategoriesByValue(...args); });
exports.default = router;
