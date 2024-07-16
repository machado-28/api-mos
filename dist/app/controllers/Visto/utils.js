"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relatorioDiario = relatorioDiario;
exports.relatorioMensal = relatorioMensal;
exports.relatorioSemanal = relatorioSemanal;
var _VistoRepository = _interopRequireDefault(require("../../CustomRepositories/VistoRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
async function relatorioDiario({
  tipoId,
  projetoId,
  dia = new Date().getDay()
}) {
  const vistoRepository = new _VistoRepository.default();
  const vistos = await _VistoRepository.default?.getAllByDay({
    tipoId,
    projetoId,
    dia
  });
  return vistos;
}
async function relatorioSemanal({
  tipoId,
  projetoId,
  semana
}) {
  const vistoRepository = new _VistoRepository.default();
  const vistos = await _VistoRepository.default?.getAllByWeek({
    tipoId,
    projetoId
  });
  return vistos;
}
async function relatorioMensal({
  tipoId,
  projetoId,
  mes
}) {
  const VistoRepository = new VistoRepository();
  const vistos = await VistoRepository?.getAllByMonth({
    tipoId,
    projetoId,
    mes
  });
  return vistos;
}