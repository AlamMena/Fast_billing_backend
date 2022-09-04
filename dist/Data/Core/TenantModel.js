"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TenantModel = new mongoose_1.Schema({
    CompanyId: String,
    BranchId: String
});
exports.default = TenantModel;
