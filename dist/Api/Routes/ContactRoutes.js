"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContactController_1 = __importDefault(require("../Controllers/ContactController"));
const router = (0, express_1.Router)();
router.route('/Contacts').get((...args) => { ContactController_1.default.GetAsync(...args); });
router.route('/Contact').get((...args) => { ContactController_1.default.GetByIdAsync(...args); });
router.route('/Contact').post((...args) => { ContactController_1.default.CreateAsync(...args); });
router.route('/Contact').put((...args) => { ContactController_1.default.UpdateAsync(...args); });
router.route('/Contact').delete((...args) => { ContactController_1.default.DeleteAsync(...args); });
router.route('/Contact/filtered').get((...args) => { ContactController_1.default.GetContactsByValue(...args); });
exports.default = router;
