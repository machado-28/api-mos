"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Fazes = _interopRequireDefault(require("../../models/Fazes"));
var _StatusDePedidos = _interopRequireDefault(require("../../models/StatusDePedidos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FazesController {
  async getAll(req, res) {
    const {
      procesoId
    } = req.params;
    const fazes = await _Fazes.default.findAll();
    return res.status(200).json({
      fazes
    });
  }
  async getStaus(req, res) {
    const {
      fazeId
    } = req.params;
    let dados;
    const fazes = await _Fazes.default.findAll({
      include: {
        model: _StatusDePedidos.default,
        as: "status",
        through: {}
      },
      where: {
        "$fazeId$": fazeId
      }
    });
    dados = fazes;
    return res.status(200).json(dados);
  }
}
var _default = exports.default = new FazesController();