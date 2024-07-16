"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SucessResponseMessage = void 0;
class SucessResponseMessage extends ApiError {
  constructor(message, statusCode) {
    super(message, statusCode = 401);
  }
}
exports.SucessResponseMessage = SucessResponseMessage;