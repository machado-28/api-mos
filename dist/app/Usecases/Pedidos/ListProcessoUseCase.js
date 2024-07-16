"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ProcessoRepository = require("../../CustomRepositories/ProcessoRepository");
var _RequerenteRepository = require("../../CustomRepositories/RequerenteRepository");
var _TipoVistoRepository = require("../../CustomRepositories/TipoVistoRepository");
var _apiErrors = require("../../helpers/api-errors");
var _StatatusProcessoRepository = require("../../CustomRepositories/StatatusProcessoRepository");
var _FazeRepository = require("../../CustomRepositories/FazeRepository");
class ListProcessoUseCase {
  async getAll({
    requerenteId,
    statusId,
    tipoVistoId,
    fazeId
  }) {
    const processoRepository = new _ProcessoRepository.ProcessoRepository();
    const statatusProcessoRepository = new _StatatusProcessoRepository.StatatusProcessoRepository();
    const tipoVistoRepository = new _TipoVistoRepository.TipoVistoRepository();
    const requerenteRepository = new _RequerenteRepository.RequerenteRepository();
    const FazeRepository = new FazeRepository();
    const requerenteExiste = requerenteRepository.getById(requerenteId);
    if (!requerenteExiste) {
      throw (0, _apiErrors.NotFoundError)("Requerente nao encontrado!");
    }
    if (!requerenteId && !statusId && !tipoVistoId && !fazeId) {
      const data = await processoRepository.getAll();
      return data;
    }
    const statatusExiste = statatusProcessoRepository.getById(statusId);
    if (!statatusExiste) {
      throw (0, _apiErrors.NotFoundError)("Status de processo  nao encontrado!");
    }
    const fazeExiste = FazeRepository.getById(statusId);
    if (!fazeExiste) {
      throw (0, _apiErrors.NotFoundError)("Faze de processo nao encontrado!");
    }
    const tipoVistoExiste = tipoVistoRepository.getById(statusId);
    if (!tipoVistoExiste) {
      throw (0, _apiErrors.NotFoundError)("Tipo de Visto nao encontrado!");
    }
    const data = await processoRepository.getAllAllByFazeAndStatusAndTipoVisto({
      requerenteId,
      statusId,
      tipoVistoId,
      fazeId
    });
    return data;
  }
}
var _default = exports.default = new ListProcessoUseCase();