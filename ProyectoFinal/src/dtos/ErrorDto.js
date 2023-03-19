class ErrorDto {
    constructor(error, message, status = 400, code = -1){
        this.error = error
        this.message = message
        this.status = status
        this.code = code
    }
}

export default ErrorDto