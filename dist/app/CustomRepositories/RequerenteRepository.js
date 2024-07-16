"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequerenteRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _Requerentes = _interopRequireDefault(require("../models/Requerentes"));
var _Painels = _interopRequireDefault(require("../models/Painels"));
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RequerenteRepository {
  async getById({
    id
  }) {
    console.log("cOME", id);
    const requerente = await _Requerentes.default.findOne({
      where: {
        id
      },
      include: [{
        association: "Ficheiros"
      }]
    });
    return requerente;
  }
  async getAll() {
    const {
      rows: clientes,
      count: total
    } = await _Requerentes.default.findAndCountAll();
    return {
      clientes,
      total
    };
  }
  async getByPassaporte({
    passaporte
  }) {
    const cliente = await _Requerentes.default.findOne({
      where: {
        passaporte
      }
    });
    return cliente;
  }
  async update({
    id,
    nome,
    dataNascimento,
    genero,
    estadoCivil,
    sindicato,
    nacionalidade,
    nomePai,
    nacionalidadePai,
    nomeMae,
    nacionalidadeMae,
    enderecoAngola,
    passaporte,
    passaporteDataValidade,
    passaporteDataEmissao,
    passaporteLocalEmissao,
    telefone,
    email,
    senha,
    profissao,
    funcao,
    nomeEmpresa,
    emailEmpresa,
    telefoneEmpresa,
    enderecoEmpresa
  }) {
    const clienteExiste = await this.getByName(id);
    if (!clienteExiste) throw new _apiErrors.NotFoundError("cliente id invalido");
    const actualizado = await clienteExiste.update({
      nome,
      dataNascimento,
      genero,
      estadoCivil,
      sindicato,
      nacionalidade,
      nomePai,
      nacionalidadePai,
      nomeMae,
      nacionalidadeMae,
      enderecoAngola,
      passaporte,
      passaporteDataValidade,
      passaporteDataEmissao,
      passaporteLocalEmissao,
      telefone,
      email,
      senha,
      profissao,
      funcao,
      nomeEmpresa,
      emailEmpresa,
      telefoneEmpresa,
      enderecoEmpresa
    });
    return true;
  }
  async create({
    nome,
    dataNascimento,
    genero,
    estadoCivil,
    sindicato,
    nacionalidade,
    nomePai,
    nacionalidadePai,
    nomeMae,
    nacionalidadeMae,
    enderecoAngola,
    passaporte,
    passaporteDataValidade,
    passaporteDataEmissao,
    passaporteLocalEmissao,
    telefone,
    email,
    senha,
    profissao,
    funcao,
    nomeEmpresa,
    emailEmpresa,
    telefoneEmpresa,
    enderecoEmpresa
  }) {
    const requerenteNovo = await _Requerentes.default.create({
      nome,
      dataNascimento,
      genero,
      estadoCivil,
      sindicato,
      nacionalidade,
      nomePai,
      nacionalidadePai,
      nomeMae,
      nacionalidadeMae,
      enderecoAngola,
      passaporte,
      passaporteDataValidade,
      passaporteDataEmissao,
      passaporteLocalEmissao,
      telefone,
      email,
      senha,
      profissao,
      funcao,
      nomeEmpresa,
      emailEmpresa,
      telefoneEmpresa,
      enderecoEmpresa
    });
    return requerenteNovo;
  }
}
exports.RequerenteRepository = RequerenteRepository;