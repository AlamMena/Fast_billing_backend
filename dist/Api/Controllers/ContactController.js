"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CoreController_1 = require("./CoreController");
const ContactSchema_1 = require("../../Data/Schemas/Contacts/ContactSchema");
class ContactController extends CoreController_1.CoreController {
    constructor(dbModel) {
        super(dbModel);
    }
}
exports.default = new ContactController(ContactSchema_1.model);
