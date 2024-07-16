"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ProjectoRepository = require("../../CustomRepositories/ProjectoRepository");
var _apiErrors = require("../../helpers/api-errors");
var _Clientes = _interopRequireDefault(require("../../models/Clientes"));
var _Usuarios = _interopRequireDefault(require("../../models/Usuarios"));
var _createProjectoUseCase = _interopRequireDefault(require("../../Usecases/Projectos/createProjectoUseCase"));
var yup = _interopRequireWildcard(require("yup"));
var _buildWhereClause = _interopRequireDefault(require("../../utils/buildWhereClause"));
var _PainelRepository = require("../../CustomRepositories/PainelRepository");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PainelController {
  async create(req, res) {
    const schema = yup.object().shape({
      nome: yup.string().required(),
      descricao
    });
    let inputValidation = true;
    try {
      await schema.validate(req.body);
    } catch (err) {
      console.error(req.body);
      inputValidation = false;
      const erro = err.errors[0];
      throw new _apiErrors.BadRequestError(erro); // Lança o erro para a middleware de erros lidar com ele
    }
    let {
      nome,
      gestorExternoId,
      clienteId,
      gestorInternoId
    } = req.body;
    console.log("body", req.body);
    if (gestorInternoId === "") gestorInternoId = null;
    const projecto = await _createProjectoUseCase.default.execute({
      nome,
      clienteId,
      gestorExternoId,
      gestorInternoId
    });
    return res.status(201).json({
      projecto,
      status: "ok",
      code: 201
    });
  }
  async count(req, res) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    let query = (0, _buildWhereClause.default)(req.query);
    const {
      orderBy,
      order
    } = query;
    let attributes = [];
    const {
      total
    } = await projectoRepository.count({
      whereClause: query
    });
    return res.json({
      total
    });
  }
  async list(req, res) {
    const painelRepository = new _PainelRepository.PainelRepository();
    const {
      order,
      orderBy
    } = req.query;
    console.log("PARAMS", req.query);
    let attributes = [];
    const {
      painels,
      total
    } = await painelRepository.getAllCustom({
      whereClause: req.query,
      orderClause: [{
        orderBy,
        order
      }],
      attributes
    });
    return res.status(200).json({
      painels,
      total,
      status: "ok",
      code: 200
    });
  }
  async getOne(req, res) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const {
      id
    } = req.params;
    const cargo = await projectoRepository.getById({
      id
    });
    return res.status(200).json({
      projectos,
      status: "ok",
      code: 200
    });
  }
  async update(req, res) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const {
      id
    } = req.params;
    const data = req.body;
    const cargo = await projectoRepository.update({
      id,
      data
    });
    return res.status(201).json({
      message: "operacao realizada com sucesso",
      status: "ok",
      code: 200
    });
  }
  async delete(req, res) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const {
      id
    } = req.params;
    const cargo = await projectoRepository.delete({
      id
    });
    return res.status(200).json({
      message: "operacao realizada com sucesso",
      status: "ok",
      code: 200
    });
  }
  async getOneWithAllProcesses(req, res) {
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const {
      id
    } = req.params;
    const projectos = await projectoRepository.getByIdAllProcesses({
      id
    });
  }
}
var _default = exports.default = new PainelController();