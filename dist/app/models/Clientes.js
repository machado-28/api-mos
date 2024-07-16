"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = _interopRequireWildcard(require("sequelize"));
require("dotenv/config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */

class Clientes extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: _sequelize.default.STRING,
      telefone1: _sequelize.default.STRING,
      telefone2: _sequelize.default.STRING,
      provincia: _sequelize.default.STRING,
      municipio: _sequelize.default.STRING,
      comuna: _sequelize.default.STRING,
      cidade: _sequelize.default.STRING,
      site: _sequelize.default.STRING,
      nomeEmpresa: _sequelize.default.STRING,
      nif: _sequelize.default.STRING,
      ramo: _sequelize.default.STRING,
      activo: _sequelize.default.BOOLEAN
    }, {
      sequelize
    });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Projectos, {
      foreignKey: "clienteId",
      as: "projectos"
    });
    this.hasMany(models.Processos, {
      foreignKey: "clienteId",
      as: "processos"
    });
    // this.hasMany(models.Tecnicos, {
    //   foreignKey: "clienteId",
    //   as: "tecnicos",
    // });
  }
}
var _default = exports.default = Clientes;