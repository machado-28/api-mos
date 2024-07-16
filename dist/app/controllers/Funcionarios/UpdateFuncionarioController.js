"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _FuncionarioReposoitory = require("../../CustomRepositories/FuncionarioReposoitory");
var _ProcessosReposoitory = require("../../CustomRepositories/ProcessosReposoitory");
var _apiErrors = require("../../helpers/api-errors");
var _ListProcessoByStatusUsecase = _interopRequireDefault(require("../../usecases/ListProcessoByStatusUsecase"));
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateFuncioanarioController {
  async execute(req, res) {
    const {
      id
    } = req.params;
    const {
      nome,
      cargoId,
      dataNascumento,
      genero,
      nacionalidade,
      nunContaBancaria,
      enderecoId,
      iban,
      dataEntrada,
      dataSaida,
      datavalidadeNif,
      nif,
      salario
    } = req.body;
    const funcionarioRepository = new _FuncionarioReposoitory.FuncionarioRepository();
    await funcionarioRepository.update({
      nome,
      cargoId,
      dataNascumento,
      genero,
      nacionalidade,
      nunContaBancaria,
      enderecoId,
      iban,
      dataEntrada,
      dataSaida,
      datavalidadeNif,
      nif,
      salario
    });
    return res.status(200).json({
      message: "Funcioánario actualizado com sucesso!"
    });
  }
}
var _default = exports.default = new UpdateFuncioanarioController();