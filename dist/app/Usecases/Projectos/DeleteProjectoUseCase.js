"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ProjectoRepository = require("../../CustomRepositories/ProjectoRepository");
var _apiErrors = require("../../helpers/api-errors");
class DeleteProjectoUsecase {
  async execute({
    id
  }) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const projectoExiste = await projectoRepository.getById({
      id
    });
    if (!projectoExiste) {
      throw new _apiErrors.UnAuthoriazedError("Id inválido!");
    }
    await projecto(data);
    return true;
  }
}
var _default = exports.default = new DeleteProjectoUsecase();