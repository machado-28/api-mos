"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FazeRepository = void 0;
var _Fazes = _interopRequireDefault(require("../models/Fazes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FazeRepository {
  async create({
    pedidoId,
    nome,
    status,
    descricao
  }) {
    const faze = await _Fazes.default.create({
      pedidoId,
      nome,
      status,
      descricao
    });
    return faze;
  }
  async getAll({}) {}
}
exports.FazeRepository = FazeRepository;