"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _Painel = require("../../CustomRepositories/Painel");
class ListPainelUsecase {
  async execute({
    usuarioLogado
  }) {
    const painel = "ADMINISTRADOR GERAL".toLocaleUpperCase();
    let paineis;
    const painelRepository = new _Painel.PainelRepository();
    if (usuarioLogado?.painel?.nome?.toLocaleUpperCase() !== painel) {
      paineis = await painelRepository.getAllCustom({
        whereClausule: {
          nome: [_sequelize.Op.ne] = painel
        }
      });
    } else {
      paineis = await painelRepository.getAll();
    }
    return paineis;
  }
}
var _default = exports.default = new ListPainelUsecase();