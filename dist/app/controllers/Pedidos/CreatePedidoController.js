"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var yup = _interopRequireWildcard(require("yup"));
require("../../../config/yup");
var _apiErrors = require("../../helpers/api-errors");
var _CreatePedidoUseCase = _interopRequireDefault(require("../../Usecases/Pedidos/CreatePedidoUseCase"));
var _socketio = require("../../../socketio");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class CratePedidoController {
  async store(req, res) {
    const schema = yup.object().shape({
      clienteId: yup.string().required(),
      tipoId: yup.string().required(),
      tipoVistoId: yup.string().required(),
      projecto: yup.string().required()
    });
    let inputValidation = true;
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
      clienteId,
      tipoId,
      tipoVistoId
    } = req.body;

    // const pedido = await CreatePedidoUseCase.execute({
    //     tipoVistoId,
    //     requerenteId: clienteId,
    //     tipoId
    // })

    // await sendWarning({
    //     path: "/pedidos/detalhar/" + pedido?.id,
    //     title: "Novo Pedido de Visto",
    //     subtitle:
    //         `um pedido foi agendado pelo usuario,${req.sessao?.nome}, com perfil de:${req.sessao?.painel?.nome}\n Pedido:${pedido}`,

    //     event: "created",
    //     receptor: "ADMINISTRADOR",

    // })

    return res.status(201).json({
      pedido,
      message: "Pedido Submetido com sucesso!!",
      code: 201,
      status: "ok"
    });
  }
}
var _default = exports.default = new CratePedidoController();