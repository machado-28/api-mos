"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PainelRepository = void 0;
var _apiErrors = require("../helpers/api-errors");
var _Painels = _interopRequireDefault(require("../models/Painels"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PainelRepository {
  async getById({
    id
  }) {
    const painel = await _Painels.default.findOne({
      where: {
        id
      }
    });
    return painel;
  }
  async getAllCustom({
    whereClausule
  }) {
    const {
      rows: painel,
      count: total
    } = await _Painels.default.findAndCountAll({
      where: whereClausule
    });
    return {
      painel,
      total
    };
  }
  async getAll() {
    const {
      rows: painel,
      count: total
    } = await _Painels.default.findAndCountAll();
    return {
      painel,
      total
    };
  }
}
exports.PainelRepository = PainelRepository;