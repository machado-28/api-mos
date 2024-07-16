"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TecnicoRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _Tecnicos = _interopRequireDefault(require("../models/Tecnicos"));
var _Painels = _interopRequireDefault(require("../models/Painels"));
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
var _sequelize = require("sequelize");
var _buildAttributesClause = _interopRequireDefault(require("../utils/buildAttributesClause"));
var _buildOrderClause = _interopRequireDefault(require("../utils/buildOrderClause"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TecnicoRepository {
  async getById({
    id
  }) {
    console.log("ID USER", id);
    const tecnico = await _Tecnicos.default.findOne({
      where: {
        id
      }
    });
    return tecnico;
  }
  async getAll() {
    const {
      rows: tecnicos,
      count: total
    } = await _Tecnicos.default.findAndCountAll();
    return {
      tecnicos,
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
      rows: tecnicos,
      count: total
    } = await _Tecnicos.default.findAndCountAll({
      where: whereClause,
      include: includeClause,
      order: [(0, _buildOrderClause.default)(orderClause)],
      attributes: (0, _buildAttributesClause.default)(attributes)
    });
    return {
      tecnicos,
      total
    };
  }
  async count({
    whereClause
  }) {
    const total = await _Tecnicos.default.count({
      where: whereClause
    });
    return {
      total
    };
  }
  async update({
    id,
    data
  }) {
    const tecnicoExiste = await this.getById({
      id
    });
    if (!tecnicoExiste) throw new _apiErrors.NotFoundError("tecnico invalido");
    const actualizado = await tecnicoExiste.update(data);
    return true;
  }
  async delete({
    id
  }) {
    const tecnicoExiste = await this.getById({
      id
    });
    if (!tecnicoExiste) throw new _apiErrors.NotFoundError("tecnico invalido");
    await tecnicoExiste.destroy();
    return true;
  }
  async create({
    nome,
    painelId,
    tecnico,
    clienteId,
    senha,
    avatarId,
    telefone,
    email
  }) {
    const tecnicoNovo = await _Tecnicos.default.create({
      nome,
      painelId,
      tecnico,
      clienteId,
      senha,
      avatarId,
      telefone,
      email
    });
    return tecnicoNovo;
  }
}
exports.TecnicoRepository = TecnicoRepository;