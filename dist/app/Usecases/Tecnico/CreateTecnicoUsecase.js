"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _TecnicoRepository = require("../../CustomRepositories/TecnicoRepository");
var _apiErrors = require("../../helpers/api-errors");
class CreateTecnicoUsecase {
  async execute({
    nome,
    avatarId,
    clienteId,
    email,
    telefone
  }) {
    const tecnicoRepository = new _TecnicoRepository.TecnicoRepository();
    // const clienteRepository = new ClienteRe()
    const tecnicoExiste = await tecnicoRepository.getAllCustom({
      whereClause: {
        email,
        telefone
      }
    });
    if (tecnicoExiste.total > 0) {
      throw new _apiErrors.ForBiddenError("tecnico Ja Cadastrado!");
    }
    const novotecnico = await tecnicoRepository.create({
      nome,
      avatarId,
      clienteId,
      email,
      telefone
    });
    return novotecnico;
  }
}
var _default = exports.default = new CreateTecnicoUsecase();