"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("../../../config/yup");
var yup = _interopRequireWildcard(require("yup"));
var _apiErrors = require("../../helpers/api-errors");
var _CreateClienteUsecase = _interopRequireDefault(require("../../Usecases/Clientes/CreateClienteUsecase"));
var _ClienteRepository = require("../../CustomRepositories/ClienteRepository");
var _ProcessoRepository = require("../../CustomRepositories/ProcessoRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class ClienteController {
  async create(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      nomeEmpresa: yup.string().required(),
      telefone1: yup.string().required(),
      telefone2: yup.string().required(),
      email: yup.string().email().required(),
      senha: yup.string().required(),
      usuario: yup.string().required(),
      nif: yup.string().required(),
      ramo: yup.string().required(),
      site: yup.string().required(),
      endereco: yup.object({
        provincia: yup.string().required(),
        cidade: yup.string().required(),
        comuna: yup.string().required()
      }).required()
    });
    let inputValidation = true;
    const usuarioLogado = req.sessao;
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
      telefone1,
      telefone2,
      email,
      usuario,
      senha,
      nomeEmpresa,
      nif,
      ramo,
      endereco
    } = req.body;
    const {
      comuna,
      cidade,
      municipio,
      provincia
    } = endereco;
    const cliente = await _CreateClienteUsecase.default.execute({
      nome,
      telefone1,
      telefone2,
      email,
      usuario,
      senha,
      nomeEmpresa,
      nif,
      ramo,
      provincia,
      municipio,
      comuna,
      cidade,
      usuarioId: usuarioLogado?.id
    });
    return res.status(201).json({
      cliente,
      message: "cliente Registrado com Sucesso!",
      status: "ok",
      code: 200
    });
  }
  async getAll(req, res) {
    const clienteRepository = new _ClienteRepository.ClienteRepository();
    const {
      clientes,
      total
    } = await clienteRepository.getAll();
    return res.status(200).json({
      clientes,
      total,
      status: "ok",
      code: 200
    });
  }
  async count(req, res) {
    const clienteRepository = new _ClienteRepository.ClienteRepository();
    const {
      total
    } = await clienteRepository.count({});
    return res.status(200).json({
      total,
      status: "ok",
      code: 200
    });
  }
  async getAllProcessos(req, res) {
    const {
      clienteId
    } = req.params;
    const ClienteRepository = new ClienteRepository();
    const processosRepository = new _ProcessoRepository.ProcessoRepository();
    const {
      processos,
      total
    } = await processosRepository.getAllByCliente({
      clienteId
    });
    const cliente = await clienteRepository.getAll();
    return res.status(200).json({
      cliente,
      processos,
      painelId: 10,
      total,
      status: "ok",
      code: 200
    });
  }
  async getAllProcessosStatus(req, res) {
    const {
      clienteId
    } = req.params;
    const {
      statusId,
      fazeId
    } = req.query;
    const ClienteRepository = new ClienteRepository();
    const processosRepository = new _ProcessoRepository.ProcessoRepository();
    const {
      processos,
      total
    } = await processosRepository.getAllByClienteAndStatus({
      clienteId
    });
    const cliente = await clienteRepository.getAll();
    return res.status(200).json({
      cliente,
      processos,
      total,
      status: "ok",
      code: 200
    });
  }
  async getAllProjectos(req, res) {
    const {
      clienteId
    } = req.params;
    const ClienteRepository = new ClienteRepository();
    const processosRepository = new _ProcessoRepository.ProcessoRepository();
    const {
      processos,
      total
    } = await processosRepository.getAllByCliente({
      clienteId
    });
    const cliente = await clienteRepository.getAll();
    return res.status(200).json({
      cliente,
      processos,
      total,
      status: "ok",
      code: 200
    });
  }
  async getAllPedidos(req, res) {
    const ClienteRepository = new ClienteRepository();
    const {
      clientes,
      total
    } = await clienteRepository.getAll();
    return res.status(200).json({
      clientes,
      total,
      status: "ok",
      code: 200
    });
  }
  async getOne(req, res) {
    const {
      passaporte,
      id
    } = req.params;
    const clienteRepository = new _ClienteRepository.ClienteRepository();
    const cliente = await clienteRepository.getById({
      id
    });
    return res.status(200).json({
      cliente,
      status: "ok",
      code: 200
    });
  }
  async getByPassaporte(req, res) {
    const {
      passaporte
    } = req.params;
    const ClienteRepository = new ClienteRepository();
    const cliente = await clienteRepository.getByPassaporte({
      passaporte
    });
    return res.status(200).json({
      cliente,
      status: "ok",
      code: 200
    });
  }
}
var _default = exports.default = new ClienteController();