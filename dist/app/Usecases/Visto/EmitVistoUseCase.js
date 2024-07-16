"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FicheiroRepositorY = require("../../CustomRepositories/FicheiroRepositorY");
var _PedidoRepository = require("../../CustomRepositories/PedidoRepository");
var _TipoDeVistoRepository = require("../../CustomRepositories/TipoDeVistoRepository");
var _VistoRepository = _interopRequireDefault(require("../../CustomRepositories/VistoRepository"));
var _apiErrors = require("../../helpers/api-errors");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EmitVistoUseCase {
  async execute({
    processoId,
    numero,
    tipoId,
    dataValidade,
    dataEmissao,
    anexoId
  }) {
    const pedidoRepository = new _PedidoRepository.PedidoRepository();
    const processoIdIsValid = await pedidoRepository.validadteById({
      id: processoId
    });
    if (processoIdIsValid == false) {
      throw new _apiErrors.NotFoundError("processoId Invalido");
    }
    const tipoDeVistoRepository = new _TipoDeVistoRepository.TipoDeVistoRepository();
    const tipoIdIsValid = tipoDeVistoRepository.validateById({
      id: tipoId
    });
    if (!tipoIdIsValid) {
      throw new _apiErrors.NotFoundError("tipo de visto Id Invalido");
    }
    const anexoRepository = new _FicheiroRepositorY.FicheiroRepository();
    const anexoIdIsValid = await anexoRepository.validateById({
      id: anexoId
    });
    if (!anexoIdIsValid) {
      throw new _apiErrors.NotFoundError("anexo Id Invalido");
    }
    const vistoRepository = new _VistoRepository.default();
    await vistoRepository.create({
      numero,
      anexoId,
      processoId,
      tipoId,
      dataEmissao,
      dataValidade
    });
    return true;
  }
}
var _default = exports.default = new EmitVistoUseCase();