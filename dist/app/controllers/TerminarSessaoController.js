"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class TerminarSessaoController {
  async executar(req, res) {
    req.headers.authorization = null;
    return res.status(200).json({
      message: true
    });
  }
}
var _default = exports.default = new TerminarSessaoController();