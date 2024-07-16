"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = _interopRequireWildcard(require("sequelize"));
require("dotenv/config");
var _ProjectosTipoVistos = _interopRequireDefault(require("./ProjectosTipoVistos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable import/no-extraneous-dependencies */

class Projectos extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: _sequelize.default.STRING
    }, {
      sequelize
    });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Processos, {
      foreignKey: "projectoId",
      as: "processo"
    });
    this.belongsTo(models.Clientes, {
      foreignKey: "clienteId",
      as: "cliente"
    });
    this.belongsTo(models.Usuarios, {
      foreignKey: "gestorInternoId",
      as: "gestorInterno"
    });
    this.belongsTo(models.Usuarios, {
      foreignKey: "gestorExternoId",
      as: "gestorExterno"
    });
  }
}
var _default = exports.default = Projectos;