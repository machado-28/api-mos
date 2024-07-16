"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("dotenv/config");
var _default = exports.default = {
  secret: process.env.APP_SECRET || "METALICA",
  expiresIn: "6d"
};