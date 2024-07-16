"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("express-async-errors");
require("dotenv/config");
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _routes = _interopRequireDefault(require("./routes"));
require("./database");
var _error = require("./app/middleware/error");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class App {
  constructor() {
    this.server = (0, _express.default)();
    this.middlewares();
    this.routes();
    this.exceptionError();
  }
  middlewares() {
    this.server.use(_express.default.urlencoded({
      extended: true
    }));
    this.server.use(_express.default.json());
    this.server.use((0, _cors.default)({
      origin: "*",
      allowedHeaders: "*",
      exposedHeaders: [],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      credentials: true
    }));
    this.server.use("/ficheiros", _express.default.static(_path.default.resolve(__dirname, "..", "temp", "upload")));
    this.server.use("/public", _express.default.static(_path.default.resolve(__dirname, "..", "public")));
  }
  routes() {
    this.server.use(_routes.default);
  }
  exceptionError() {
    this.server.use(_error.ErrorMiddleware);
  }
}
var _default = exports.default = new App().server;