"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ProcessosReposoitory = require("../../CustomRepositories/ProcessosReposoitory");
class DetalheProcessosController {
  async execute(req, res) {
    const {
      id
    } = req.params;
    const processosRepository = new _ProcessosReposoitory.ProcessosRepository();
    const processo = await processosRepository.getById(id);
    return res.status(200).json({
      processo
    });
  }
}
var _default = exports.default = new DetalheProcessosController();