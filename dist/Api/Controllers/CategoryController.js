"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreController_1 = require("./CoreController");
const CategorySchema_1 = require("../../Data/Schemas/Inventory/CategorySchema");
class CategoryController extends CoreController_1.CoreController {
    constructor(model) {
        super(CategorySchema_1.model);
    }
}
exports.default = new CategoryController(CategorySchema_1.model);
