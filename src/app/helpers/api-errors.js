export class ApiError extends Error {
    statusCode
    constructor(message, statusCode) {
        super(message, statusCode)
        this.statusCode = statusCode
    }

}

export class BadRequestError extends ApiError {

    constructor(message, statusCode) {

        super(message, statusCode = 400)

    }
}

export class UnAuthoriazedError extends ApiError {

    constructor(message, statusCode) {

        super(message, statusCode = 401)

    }
}


export class NotFoundError extends ApiError {

    constructor(message, statusCode) {

        super(message, statusCode = 404)

    }
}

export class ForBiddenError extends ApiError {

    constructor(message, statusCode) {

        super(message, statusCode = 403)

    }
}