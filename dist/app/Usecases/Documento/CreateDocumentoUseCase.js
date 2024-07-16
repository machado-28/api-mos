"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _DocumentosRepository = require("../../CustomRepositories/DocumentosRepository");
class CreateDocumentoUsecase {
  async execute({
    dataEmissao,
    dataValidade,
    numero,
    emissora,
    pedidoId,
    anexoId,
    requerenteId,
    tipoId
  }) {
    const documenentoRepository = new _DocumentosRepository.DocumenentoRepository();
    const documento = await documenentoRepository.create({
      tipoId,
      numero,
      requerenteId,
      pedidoId,
      emissora,
      anexoId,
      dataValidade,
      dataEmissao
    });
    return documento;
  }
}
var _default = exports.default = new CreateDocumentoUsecase();