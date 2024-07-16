"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var yup = _interopRequireWildcard(require("yup"));
require("../../../config/yup");
var _apiErrors = require("../../helpers/api-errors");
var _CreatePedidoDeEmissaoUseCase = _interopRequireDefault(require("../../Usecases/Pedidos/CreatePedidoDeEmissaoUseCase"));
var _CreateRequerenteUsecase = _interopRequireDefault(require("../../Usecases/Requerente/CreateRequerenteUsecase"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class CratePedidoEmissaoController {
  async store(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      dataNascimento: yup.date().required(),
      genero: yup.string().required(),
      estadoCivil: yup.string().required(),
      nacionalidade: yup.string().required(),
      sindicato: yup.string().required(),
      nascimento: yup.object({
        pais: yup.string().required(),
        provincia: yup.string().required(),
        municipio: yup.string().required(),
        bairro: yup.string().required()
      }).required(),
      filiacao: yup.object({
        mae: yup.string().required(),
        pai: yup.string().required()
      }).required(),
      // passaporte: yup.object({
      //     numero: yup.string().required(),
      //     dataEmissao: yup.string().required(),
      //     dataValidade: yup.string().required(),
      //     emissora: yup.string().required(),
      // }).required(),
      projecto: yup.string().required(),
      contacto: yup.object({
        telefone: yup.string().required(),
        email: yup.string().email().required()
      }),
      enderecoAngola: yup.object({
        provincia: yup.string().required(),
        cidade: yup.string().required()
      }).required()
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
      nome,
      dataNascimento,
      genero,
      estadoCivil,
      codigoPostal,
      nacionalidade,
      paisNascimento,
      numDocumentoIdentificacao,
      contacto,
      enderecoAngola,
      enderecoOrigem
    } = req.body;

    // const { email, telefone } = contacto
    // const {
    //     provincia: provinciaActual,
    //     cidade: cidadeAtual }
    //     = enderecoAngola;

    // const {
    //     cidade: cidadePermante,
    //     provincia: provinciaPermanente,
    //     numCasa
    // } = enderecoOrigem

    const requerente = await _CreateRequerenteUsecase.default.execute(req.body);
    const {
      id: requerenteId,
      numeroPassaporte
    } = requerente;
    console.log("PAP", requerenteId);
    const pedido = await _CreatePedidoDeEmissaoUseCase.default.execute({
      requerenteId,
      fazeId: 1,
      statusId: 1,
      tipoVistoId
    });
    return res.status(201).json({
      pedido,
      message: "Pedido Submetido com sucesso!!"
    });
  }
}
var _default = exports.default = new CratePedidoEmissaoController();