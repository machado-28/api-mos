"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClienteRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _Clientes = _interopRequireDefault(require("../models/Clientes"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ClienteRepository {
  async getById({
    id
  }) {
    const projecto = await _Clientes.default.findOne({
      where: {
        id
      }
    });
    return projecto;
  }
  async getByName({
    nome
  }) {
    const projecto = await _Clientes.default.findOne({
      where: {
        nome
      }
    });
    return projecto;
  }
  async getAll() {
    const {
      rows: clientes,
      count: total
    } = await _Clientes.default.findAndCountAll();
    return {
      clientes,
      total
    };
  }
  async getAllCustom({
    whereClausule
  }) {
    const {
      rows: clientes,
      count: total
    } = await _Clientes.default.findAndCountAll({
      where: whereClausule
    });
    return {
      clientes,
      total
    };
  }
  async update({
    id,
    data
  }) {
    const projectoExiste = await this.getById({
      id
    });
    if (!projectoExiste) {
      throw new _apiErrors.BadRequestError("id projecto invalido");
    }
    projectoExiste.update(data);
    return true;
  }
  async create({
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
    usuarioId,
    activo
  }) {
    const clienteNovo = await _Clientes.default.create({
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
      usuarioId,
      activo
    });
    return clienteNovo;
  }
  async count({
    whereClause = undefined
  }) {
    const total = await _Clientes.default.count({
      where: whereClause
    });
    console.log("TOTAL=>", total);
    return {
      total
    };
  }
}
exports.ClienteRepository = ClienteRepository;