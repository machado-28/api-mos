"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiMessageResponse = void 0;
class ApiMessageResponse extends Error {
  statusCode;
  constructor(message, statusCode) {
    super(message, statusCode);
    this.statusCode = statusCode;
  }
}
exports.ApiMessageResponse = ApiMessageResponse;