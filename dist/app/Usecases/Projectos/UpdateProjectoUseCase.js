"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ProjectoRepository = require("../../CustomRepositories/ProjectoRepository");
var _apiErrors = require("../../helpers/api-errors");
class UpdateProjectoUsecase {
  async execute({
    id,
    clienteId,
    data
  }) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const projectoExiste = await projectoRepository.getById({
      id
    });
    if (!projectoExiste) {
      throw new _apiErrors.UnAuthoriazedError("Id inválido!");
    }

    //VERIFICAR SE TEM PERMISSAO...clienteId

    const resp = await projectoRepository.update({
      id,
      data
    });
    return resp;
  }
}
var _default = exports.default = new UpdateProjectoUsecase();