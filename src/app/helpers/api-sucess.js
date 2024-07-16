
export class SucessResponseMessage extends ApiError {
    constructor(message, statusCode) {

        super(message, statusCode = 401)

    }
}
