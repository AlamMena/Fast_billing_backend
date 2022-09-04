"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbContext = void 0;
const mongoose_1 = require("mongoose");
const CompanyDAO_1 = __importDefault(require("../Schemas/CompanyDAO"));
const CompanySchema = new mongoose_1.Schema({
    Name: String,
    Identification: String,
    Adderess: String,
    PhoneNumber: String
});
class DbContext {
    constructor() {
        this.Companies = CompanyDAO_1.default;
    }
}
exports.DbContext = DbContext;
exports.default = DbContext;
