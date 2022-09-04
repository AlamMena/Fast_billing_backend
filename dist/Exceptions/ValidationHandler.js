"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = exports.GenerateValidationResponse = void 0;
function GenerateValidationResponse(params) {
    var _a, _b;
    let response = {
        Message: (_a = params === null || params === void 0 ? void 0 : params.Message) !== null && _a !== void 0 ? _a : "An validation error has ocurred",
        Code: (_b = params === null || params === void 0 ? void 0 : params.Code) !== null && _b !== void 0 ? _b : 400
    };
    return response;
}
exports.GenerateValidationResponse = GenerateValidationResponse;
class ErrorResponse {
    constructor(message, code) {
        this.Message = message !== null && message !== void 0 ? message : "An error has ocurred";
        this.Code = code !== null && code !== void 0 ? code : 500;
    }
}
exports.ErrorResponse = ErrorResponse;
