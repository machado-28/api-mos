"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RequerenteRepository = require("../../CustomRepositories/RequerenteRepository");
var _apiErrors = require("../../helpers/api-errors");
class ListDocumentoUseCse {
  async getAll({
    requerenteId
  }) {
    const documenentoRepository = new DocumenentoRepository();
    const requerenteRepository = new _RequerenteRepository.RequerenteRepository();
    const requerenteExiste = requerenteRepository.getById(requerenteId);
    if (!requerenteExiste) {
      throw (0, _apiErrors.NotFoundError)("Requerente nao encontrado!");
    }
    const documentos = await documenentoRepository.getAll({
      requerenteId
    });
    return documentos;
  }
}
var _default = exports.default = new ListDocumentoUseCse();