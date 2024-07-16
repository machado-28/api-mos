"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
var _ClienteRepository = require("../../CustomRepositories/ClienteRepository");
var _apiErrors = require("../../helpers/api-errors");
var _CreateUsuarioUsecase = _interopRequireDefault(require("../Usuario/CreateUsuarioUsecase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateclienteUsecase {
  async execute({
    nome,
    telefone1,
    telefone2,
    email,
    usuario,
    senha,
    nomeEmpresa,
    nif,
    ramo,
    site,
    provincia,
    municipio,
    comuna,
    cidade,
    usuarioId
  }) {
    const clienteRepository = new _ClienteRepository.ClienteRepository();
    // const clienteRepository = new ClienteRe();

    const clienteExiste = await clienteRepository.getAllCustom({
      whereClausule: {
        [_sequelize.Op.or]: [{
          email
        }, {
          telefone1
        }, {
          telefone2
        }, {
          nif
        }]
      }
    });
    if (clienteExiste.total > 0) {
      throw new _apiErrors.ForBiddenError("cliente já cadastrado!");
    }
    const novocliente = await clienteRepository.create({
      nome,
      telefone1,
      telefone2,
      email,
      usuario,
      senha,
      nomeEmpresa,
      nif,
      ramo,
      site,
      provincia,
      municipio,
      comuna,
      cidade,
      usuarioId
    });
    const {
      id: clienteId
    } = novocliente;
    console.log("Id PAINEL ");
    const login = await _CreateUsuarioUsecase.default.execute({
      email,
      telefone: telefone1,
      painelId: 10,
      nome,
      senha,
      clienteId,
      usuario
    });
    return novocliente;
  }
}
var _default = exports.default = new CreateclienteUsecase();