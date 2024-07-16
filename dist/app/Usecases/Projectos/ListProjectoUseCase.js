"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ProjectoRepository = require("../../CustomRepositories/ProjectoRepository");
class ListProjectoUsecase {
  async execute({
    whereClause,
    orderClause,
    includeClause,
    attributesClause
  }) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const projectos = await projectoRepository.getAllCustom({
      whereClause,
      orderClause,
      includeClause,
      attributesClause
    });
    return projectos;
  }
}
var _default = exports.default = new ListProjectoUsecase();