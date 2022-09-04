"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CompanySchema = new mongoose_1.Schema({
    Name: { type: String, required: true },
    Identification: { type: String, required: true },
    Adderess: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    IsDeleted: { type: Boolean }
});
// const CompanyDAO = mongoose.model('Companies', CompanySchema);
exports.default = CompanySchema;
