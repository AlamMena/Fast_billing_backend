"use strict";
class ValidationError {
    constructor(message, code, success) {
        this.Message = message;
        this.Code = code;
        this.Success = success;
        // this.Details = details ?? [];
    }
}
