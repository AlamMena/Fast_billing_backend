"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CompanySchema = new mongoose_1.Schema({
    Name: { type: String, required: true },
    Identification: { type: String, required: true },
    Address: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    IsDeleted: { type: Boolean },
    CreatedAt: { type: Date },
    CreatedBy: { type: String },
    UpdatedAt: { type: Date },
    UpdatedBy: { type: String },
});
exports.default = CompanySchema;
