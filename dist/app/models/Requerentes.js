"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = _interopRequireWildcard(require("sequelize"));
require("dotenv/config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable no-param-reassign */

class Requerentes extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: _sequelize.default.STRING,
      genero: _sequelize.default.STRING,
      dataNascimento: _sequelize.default.DATE,
      activo: _sequelize.default.BOOLEAN,
      estadoCivil: _sequelize.default.STRING,
      sindicato: _sequelize.default.STRING,
      senha: _sequelize.default.VIRTUAL,
      email: _sequelize.default.STRING,
      senha: _sequelize.default.VIRTUAL,
      telefone: _sequelize.default.STRING,
      nomePai: _sequelize.default.STRING,
      nomeMae: _sequelize.default.STRING,
      nacionalidadePai: _sequelize.default.STRING,
      nacionalidadeMae: _sequelize.default.STRING,
      passaporte: _sequelize.default.STRING,
      passaporteDataValidade: _sequelize.default.DATE,
      passaporteDataEmissao: _sequelize.default.DATE,
      passaporteLocalEmissao: _sequelize.default.STRING,
      profissao: _sequelize.default.STRING,
      funcao: _sequelize.default.STRING,
      enderecoEmpresa: _sequelize.default.STRING,
      emailEmpresa: _sequelize.default.STRING,
      telefoneEmpresa: _sequelize.default.STRING,
      nomeEmpresa: _sequelize.default.STRING
    }, {
      sequelize
    });
    this.addHook("beforeSave", async requerente => {
      if (requerente.senha) {
        requerente.senha_hash = await bcrypt.hash(requerente.senha, 8);
      }
    });
    return this;
  }
  static associate(models) {
    this.hasMany(models.Ficheiros), {
      foreignKey: "requerenteId",
      as: "documentos"
    };
    this.hasMany(models.Pedidos, {
      foreignKey: "requerenteId",
      as: "pedidos"
    });
    this.belongsTo(models.Ficheiros, {
      foreignKey: "avatarId",
      as: "avatar"
    });
  }
  validarSenha(senha) {
    console.log(senha);
    return bcrypt.compareSync(senha.toString(), this.senha_hash);
  }
}
var _default = exports.default = Requerentes;