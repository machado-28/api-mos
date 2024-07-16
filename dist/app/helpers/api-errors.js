"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnAuthoriazedError = exports.NotFoundError = exports.ForBiddenError = exports.BadRequestError = exports.ApiError = void 0;
class ApiError extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message, statusCode);
    this.statusCode = statusCode;
  }
}
exports.ApiError = ApiError;
class BadRequestError extends ApiError {
  constructor(message, statusCode) {
    super(message, statusCode = 400);
  }
}
exports.BadRequestError = BadRequestError;
class UnAuthoriazedError extends ApiError {
  constructor(message, statusCode) {
    super(message, statusCode = 401);
  }
}
exports.UnAuthoriazedError = UnAuthoriazedError;
class NotFoundError extends ApiError {
  constructor(message, statusCode) {
    super(message, statusCode = 404);
  }
}
exports.NotFoundError = NotFoundError;
class ForBiddenError extends ApiError {
  constructor(message, statusCode) {
    super(message, statusCode = 403);
  }
}
exports.ForBiddenError = ForBiddenError;