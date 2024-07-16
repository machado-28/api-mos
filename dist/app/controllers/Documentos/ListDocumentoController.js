"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FicheiroRepositorY = require("../../CustomRepositories/FicheiroRepositorY");
var _enviarEmailUseCase = _interopRequireDefault(require("../../Usecases/Email/enviarEmailUseCase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListDocumentoController {
  async getAll(req, res) {
    const {
      numero,
      pedidoId,
      requerenteId
    } = req.query;
    const documentoRepository = new _FicheiroRepositorY.FicheiroRepositorYRepository();
    let documentos;
    if (pedidoId) {
      documentos = await documentoRepository.getByPedidoId({
        pedidoId
      });
    }
    await _enviarEmailUseCase.default.execute();
    return res.status(200).json({
      documentos
    });
  }
}
var _default = exports.default = new ListDocumentoController();