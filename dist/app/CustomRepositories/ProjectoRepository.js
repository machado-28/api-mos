"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProjectoRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _Projectos = _interopRequireDefault(require("../models/Projectos"));
var _Painels = _interopRequireDefault(require("../models/Painels"));
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
var _buildOrderClause = _interopRequireDefault(require("../utils/buildOrderClause"));
var _buildAttributesClause = _interopRequireDefault(require("../utils/buildAttributesClause"));
var _buildWhereClause = _interopRequireDefault(require("../utils/buildWhereClause"));
var _buildIncludeClause = _interopRequireDefault(require("../utils/buildIncludeClause"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ProjectoRepository {
  async getById({
    id
  }) {
    const projecto = await _Projectos.default.findOne({
      where: {
        id
      }
    });
    console.log("projecto", projecto);
    return projecto;
  }
  async delete({
    id
  }) {
    const projecto = await _Projectos.default.findOne({
      where: {
        id
      }
    });
    if (!projecto) {
      throw new _apiErrors.NotFoundError("projecto nao encontrado");
    }
    console.log("projecto", projecto);
    await projecto.destroy(id);
    return true;
  }
  async getByName({
    nome,
    clienteId
  }) {
    console.log("cOME", nome);
    const projecto = await _Projectos.default.findOne({
      where: {
        nome,
        clienteId
      }
    });
    console.log("projecto", projecto);
    return projecto;
  }
  async getAll() {
    const {
      rows: projectos,
      count: total
    } = await _Projectos.default.findAndCountAll();
    return {
      projectos,
      total
    };
  }
  async count({
    whereClause
  }) {
    const total = await _Projectos.default.count({
      where: whereClause
    });
    console.log("TOTAL=>", total);
    return {
      total
    };
  }
  async getAllCustom({
    whereClause,
    orderClause,
    includeClause,
    attributesClause,
    attributes
  }) {
    const {
      rows: projectos,
      count: total
    } = await _Projectos.default.findAndCountAll({
      where: (0, _buildWhereClause.default)(whereClause),
      include: (0, _buildIncludeClause.default)(includeClause),
      order: [(0, _buildOrderClause.default)(orderClause)],
      attributes: (0, _buildAttributesClause.default)(attributes)
    });
    return {
      projectos,
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
    await projectoExiste.update(data);
    return true;
  }
  async create({
    nome,
    clienteId,
    gestorExternoId,
    gestorInternoId
  }) {
    const projectoNovo = await _Projectos.default.create({
      nome,
      clienteId,
      gestorExternoId,
      gestorInternoId
    });
    return projectoNovo;
  }
}
exports.ProjectoRepository = ProjectoRepository;