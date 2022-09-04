

interface ValidationResponse {
    Message: string,
    Code: number,
}

function GenerateValidationResponse(params?: ValidationResponse) {

    let response: ValidationResponse = {

        Message: params?.Message ?? "An validation error has ocurred",
        Code: params?.Code ?? 400
    }

    return response;
}

class ErrorResponse {

    Message?: String
    Code?: Number

    constructor(message?: String, code?: Number) {

        this.Message = message ?? "An error has ocurred"
        this.Code = code ?? 500
    }

}
export { ValidationResponse, GenerateValidationResponse, ErrorResponse }