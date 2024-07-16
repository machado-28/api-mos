"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var yup = _interopRequireWildcard(require("yup"));
var _Documento = _interopRequireDefault(require("../../models/Documento"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */

class EditarDocumentoController {
  async executar(req, res) {
    try {
      const {
        id_proprietario,
        id
      } = req.params;
      const escola = await _Documento.default.findOne({
        where: {
          id
        }
      });
      if (!escola) return res.status(404).json({
        status: 404,
        erro: "Documento invalido!"
      });
      await escola.update({
        id_proprietario
      });
      return res.status(200).json({
        status: 200,
        mensagem: "operacao realizada com sucesso!"
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        erro: "falha ao realizar esta operação",
        status: 500
      });
    }
  }
}
var _default = exports.default = new EditarDocumentoController();