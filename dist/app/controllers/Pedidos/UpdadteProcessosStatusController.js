"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var yup = _interopRequireWildcard(require("yup"));
var _ProcessosReposoitory = require("../../CustomRepositories/ProcessosReposoitory");
var _apiErrors = require("../../helpers/api-errors");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
class UpdadteProcessosStatusController {
  async execute(req, res) {
    const schema = yup.object().shape({
      statusId: yup.string().required(),
      processoId: yup.string().required()
    });
    try {
      await schema.validate(req.body);
    } catch (err) {
      console.error(req.body);
      const erro = err.errors[0];
      throw new _apiErrors.BadRequestError(erro);
    }
    const {
      processoId,
      statusId
    } = req.body;
    console.log("status & processo", statusId, processoId);

    // await UpdateStatusProcessoUsecase.execute({ processostatusId }).catch((erro) => {
    //     throw new BadRequestError(erro); // L
    // });

    const processosRepository = new _ProcessosReposoitory.ProcessosRepository();
    const processoEncontrado = await processosRepository.getById(processoId);
    if (Number(statusId) === Number(_ProcessosReposoitory.statusProcessoIds?.aprovadoMirempetEm)) {
      await processoEncontrado.update({
        aprovadoMirempetEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    if (statusId === _ProcessosReposoitory.statusProcessoIds.aprovadoSMEEm) {
      await processoEncontrado.update({
        aprovadoSMEEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    if (statusId === _ProcessosReposoitory.statusProcessoIds.recusadoSMEEm) {
      await processoEncontrado.update({
        recusadoSMEEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    if (statusId === _ProcessosReposoitory.statusProcessoIds.canceladoEm) {
      await processoEncontrado.update({
        canceladoEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    if (statusId === _ProcessosReposoitory.statusProcessoIds.legalizadoEm) {
      await processoEncontrado.update({
        legalizadoEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    if (statusId === _ProcessosReposoitory.statusProcessoIds.recusadoSMEEm) {
      await processoEncontrado.update({
        recusadoSMEEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    if (statusId === _ProcessosReposoitory.statusProcessoIds.subemtidoMirempetEm) {
      await processoEncontrado.update({
        subemtidoMirempetEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    if (statusId === _ProcessosReposoitory.statusProcessoIds.subemtidoSMEEm) {
      await processoEncontrado.update({
        subemtidoSMEEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    if (statusId === _ProcessosReposoitory.statusProcessoIds.transitadoEm) {
      await processoEncontrado.update({
        transitadoEm: new Date(),
        statusId
      });
      return res.status(200).json({
        message: "Operação Realizada com sucesso"
      });
    }
    throw new _apiErrors.NotFoundError("Algo deu errado!");
  }
}
var _default = exports.default = new UpdadteProcessosStatusController();