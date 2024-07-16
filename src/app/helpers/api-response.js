export class ApiMessageResponse extends Error {
    statusCode
    constructor(message, statusCode) {
        super(message, statusCode)
        this.statusCode = statusCode
    }

}