"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListStatusProcessoUsecase = _interopRequireDefault(require("../../usecases/ListStatusProcessoUsecase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListStatusProcessosController {
  async getAll(req, res) {
    const {
      status,
      total
    } = await _ListStatusProcessoUsecase.default.execute();
    return res.status(200).json({
      status,
      total
    });
  }
}
var _default = exports.default = new ListStatusProcessosController();