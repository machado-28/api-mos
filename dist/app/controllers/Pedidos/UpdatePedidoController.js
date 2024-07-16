"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _PedidoRepository = require("../../CustomRepositories/PedidoRepository");
var _apiErrors = require("../../helpers/api-errors");
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class UpdatePedidoController {
  async execute(req, res) {
    const schema = yup.object().shape({
      descricao: yup.string(),
      statusId: yup.string().required()
    });
    let inputValidation = true;
    const {
      tipoVistoId = 1
    } = req.params;
    req.body.tipoVistoId = tipoVistoId;
    console.log('BODY', req.body);
    try {
      await schema.validate(req.body);
    } catch (err) {
      console.error(req.body);
      inputValidation = false;
      const erro = err.errors[0];
      throw new _apiErrors.BadRequestError(erro); // Lança o erro para a middleware de erros lidar com ele
    }
    const {
      id
    } = req.params;
    const {
      descricao,
      statusId
    } = req.body;
    console.log("corpo da loci 7 params", req.body, req.parms);
    const pedidoRepository = new _PedidoRepository.PedidoRepository();
    const aceite = await pedidoRepository.updateStatus({
      id,
      descricao,
      statusId
    });
    if (!aceite) {
      throw new _apiErrors.BadRequestError("Impossível executar esta acção!");
    }
    return res.status(200).json({
      message: "Operação realizada com sucessodsdsd!"
    });
  }
}
var _default = exports.default = new UpdatePedidoController();