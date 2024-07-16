"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ProcessosReposoitory = require("../CustomRepositories/ProcessosReposoitory");
class DashboardController {
  async processos(req, res) {
    const {
      date = new Date()
    } = req.query;
    const processosRepository = new _ProcessosReposoitory.ProcessosRepository();
    let {
      total: TotalSubmetidos
    } = await processosRepository.getAll({
      date
    });
    let {
      total: TotalCancelados
    } = await processosRepository.getAllByStatus({
      statusId: _ProcessosReposoitory.statusProcessoIds.canceladoEm,
      date
    });
    let {
      total: TotalRecusadosSME
    } = await processosRepository.getAllByStatus({
      statusId: _ProcessosReposoitory.statusProcessoIds.recusadoSMEEm,
      date
    });
    let {
      total: TotalAprovadosSME
    } = await processosRepository.getAllByStatus({
      statusId: _ProcessosReposoitory.statusProcessoIds.aprovadoSMEEm,
      date
    });
    let {
      total: TotalAprovadoMirempet
    } = await processosRepository.getAllByStatus({
      statusId: _ProcessosReposoitory.statusProcessoIds.aprovadoMirempetEm,
      date
    });
    let {
      total: TotalSubmetidosMirempet
    } = await processosRepository.getAllByStatus({
      statusId: _ProcessosReposoitory.statusProcessoIds.subemtidoMirempetEm,
      date
    });
    let {
      total: TotalSubmetidoSME
    } = await processosRepository.getAllByStatus({
      statusId: _ProcessosReposoitory.statusProcessoIds.subemtidoSMEEm,
      date
    });
    let {
      total: TotalLegalizacao
    } = await processosRepository.getAllByStatus({
      statusId: _ProcessosReposoitory.statusProcessoIds.legalizadoEm,
      date
    });
    let {
      total: TotalTranasicao
    } = await processosRepository.getAllByStatus({
      statusId: _ProcessosReposoitory.statusProcessoIds.transitadoEm,
      date
    });
    TotalCancelados = !TotalCancelados && 0;
    TotalAprovadoMirempet = !TotalAprovadoMirempet && 0;
    TotalAprovadosSME = !TotalAprovadosSME && 0;
    TotalRecusadosSME = !TotalRecusadosSME && 0;
    TotalTranasicao = !TotalTranasicao && 0;
    TotalLegalizacao = !TotalLegalizacao && 0;
    return res.status(200).json({
      processos: {
        secretaria: {
          submetidos: {
            total: TotalSubmetidos
          },
          transicao: {
            total: TotalTranasicao
          },
          legalizacao: {
            total: TotalLegalizacao
          }
          // cancelados: {
          //     percent: ((TotalSubmetidos / 100) * TotalCancelados) + "%",
          //     total: TotalCancelados,
          // },
          // legalizacao: {
          //     percent: ((TotalSubmetidos / 100) * TotalCancelados) + "%",
          //     total: TotalCancelados,
          // },
        },
        mirempet: {
          submetidos: {
            total: TotalSubmetidosMirempet
          },
          aprovados: {
            total: TotalAprovadoMirempet
          }
        },
        ss7: {
          cancelados: {
            total: TotalCancelados
          }
        },
        sme: {
          submetidos: {
            total: TotalSubmetidoSME
          },
          aprovados: {
            total: TotalAprovadosSME
          },
          recusados: {
            total: TotalRecusadosSME
          }
        }
      }
    });
  }
}
var _default = exports.default = new DashboardController();