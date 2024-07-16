"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _VistoRepository = _interopRequireDefault(require("../../CustomRepositories/VistoRepository"));
var _EmitVistoUseCase = _interopRequireDefault(require("../../Usecases/Visto/EmitVistoUseCase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class VistoController {
  async create(req, res) {
    const {
      numero,
      tipoId,
      dataValidade,
      dataEmissao,
      anexoId,
      processoId
    } = req.body;
    await _EmitVistoUseCase.default.execute({
      numero,
      tipoId,
      dataValidade,
      dataEmissao,
      anexoId,
      processoId
    });
    return res.status(201).json({
      message: "Visto emitido Com Sucesso",
      status: 201
    });
  }
  async getAll(req, res) {
    const vistoRepository = new _VistoRepository.default();
    const {
      total,
      vistos
    } = await vistoRepository.getAll();
    return res.status(200).json({
      total,
      vistos
    });
  }
  async getAllExpired(req, res) {
    const vistoRepository = new _VistoRepository.default();
    const {
      total,
      vistos
    } = await vistoRepository.getAllUnvaliableDate();
    return res.status(200).json({
      total,
      vistos
    });
  }
  async getAllActived(req, res) {
    const vistoRepository = new _VistoRepository.default();
    const {
      total,
      vistos
    } = await vistoRepository.getAllValiableDate();
    return res.status(200).json({
      total,
      vistos
    });
  }
  async getOne(req, res) {
    const vistoRepository = new _VistoRepository.default();
    const {
      id
    } = req.params;
    const visto = await vistoRepository.getById({
      id
    });
    return res.status(200).json({
      visto
    });
  }
}
var _default = exports.default = new VistoController();