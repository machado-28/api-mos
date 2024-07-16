"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsuarioRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _Usuarios = _interopRequireDefault(require("../models/Usuarios"));
var _Painels = _interopRequireDefault(require("../models/Painels"));
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
var _sequelize = require("sequelize");
var _buildAttributesClause = _interopRequireDefault(require("../utils/buildAttributesClause"));
var _buildOrderClause = _interopRequireDefault(require("../utils/buildOrderClause"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UsuarioRepository {
  async getById({
    id = 0
  }) {
    console.log("ID USER", id);
    const usuario = await _Usuarios.default.findOne({
      where: {
        id
      },
      include: [{
        model: _Painels.default,
        as: "painel"
      }]
    });
    return usuario;
  }
  async getAll() {
    const {
      rows: usuario,
      count: total
    } = await _Usuarios.default.findAndCountAll();
    return {
      usuario,
      total
    };
  }
  async getAllCustom({
    whereClause,
    orderClause,
    includeClause,
    attributes
  }) {
    const {
      rows: usuario,
      count: total
    } = await _Usuarios.default.findAndCountAll({
      where: whereClause,
      include: includeClause,
      order: [(0, _buildOrderClause.default)(orderClause)],
      attributes: (0, _buildAttributesClause.default)(attributes)
    });
    return {
      usuario,
      total
    };
  }
  async count({
    whereClause
  }) {
    const total = await _Usuarios.default.count({
      where: whereClause
    });
    return {
      total
    };
  }
  async getByUsuario({
    usuario
  }) {
    const usuarioExiste = await _Usuarios.default.findOne({
      where: {
        usuario
      }
    });
    return usuarioExiste;
  }
  async getByUsuario({
    usuario
  }) {
    const usuarioExiste = await _Usuarios.default.findOne({
      where: {
        usuario
      }
    });
    return usuarioExiste;
  }
  async update({
    id,
    data
  }) {
    const usuarioExiste = await this.getById({
      id
    });
    if (!usuarioExiste) throw new _apiErrors.NotFoundError("usuario invalido");
    const actualizado = await usuarioExiste.update(data);
    return true;
  }
  async delete({
    id
  }) {
    const usuarioExiste = await this.getById({
      id
    });
    if (!usuarioExiste) throw new _apiErrors.NotFoundError("usuario invalido");
    await usuarioExiste.destroy();
    return true;
  }
  async create({
    nome,
    painelId,
    usuario,
    clienteId,
    senha,
    avatarId,
    telefone,
    email
  }) {
    const usuarioNovo = await _Usuarios.default.create({
      nome,
      painelId,
      usuario,
      clienteId,
      senha,
      avatarId,
      telefone,
      email
    });
    return usuarioNovo;
  }
}
exports.UsuarioRepository = UsuarioRepository;