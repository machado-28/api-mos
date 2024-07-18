import { ProcessosRepository, statusProcessoIds } from "../CustomRepositories/ProcessosReposoitory";

class DashboardController {
    async processos(req, res) {
        const { date = new Date() } = req.query
        const processosRepository = new ProcessosRepository()
        let { total: TotalSubmetidos } = await processosRepository.getAll({ date });
        let { total: TotalCancelados } = await processosRepository.getAllByStatus({ statusId: statusProcessoIds.canceladoEm, date })
        let { total: TotalRecusadosSME } = await processosRepository.getAllByStatus({ statusId: statusProcessoIds.recusadoSMEEm, date })
        let { total: TotalAprovadosSME } = await processosRepository.getAllByStatus({ statusId: statusProcessoIds.aprovadoSMEEm, date })
        let { total: TotalAprovadoMirempet } = await processosRepository.getAllByStatus({ statusId: statusProcessoIds.aprovadoMirempetEm, date })
        let { total: TotalSubmetidosMirempet } = await processosRepository.getAllByStatus({ statusId: statusProcessoIds.subemtidoMirempetEm, date })
        let { total: TotalSubmetidoSME } = await processosRepository.getAllByStatus({ statusId: statusProcessoIds.subemtidoSMEEm, date })
        let { total: TotalLegalizacao } = await processosRepository.getAllByStatus({ statusId: statusProcessoIds.legalizadoEm, date })
        let { total: TotalTranasicao } = await processosRepository.getAllByStatus({ statusId: statusProcessoIds.transitadoEm, date })


        TotalCancelados = !TotalCancelados && 0;
        TotalAprovadoMirempet = !TotalAprovadoMirempet && 0;
        TotalAprovadosSME = !TotalAprovadosSME && 0;
        TotalRecusadosSME = !TotalRecusadosSME && 0
        TotalTranasicao = !TotalTranasicao && 0;
        TotalLegalizacao = !TotalLegalizacao && 0;


        return res.status(200).json({
            processos: {
                secretaria: {
                    submetidos: {
                        total: TotalSubmetidos,
                    },
                    transicao: {
                        total: TotalTranasicao,
                    },
                    legalizacao: {
                        total: TotalLegalizacao,
                    },
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
                        total: TotalSubmetidosMirempet,
                    },
                    aprovados: {
                        total: TotalAprovadoMirempet,
                    },
                },
                ss7: {
                    cancelados: {
                        total: TotalCancelados
                    }
                },
                sme: {
                    submetidos: {
                        total: TotalSubmetidoSME,
                    },
                    aprovados: {
                        total: TotalAprovadosSME,
                    },
                    recusados: {
                        total: TotalRecusadosSME,
                    },
                }
            }

        })

    }
}


export default new DashboardController()