import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import { ProcessoRepository } from "../../CustomRepositories/ProcessoRepository";
import Processos from "../../models/Processos";
import Fazes from "../../models/Fazes";
import Steps from "../../models/Steps";
import Usuarios from "../../models/Usuarios";
import StatusDeSteps from "../../models/StatusDeSteps";
import ProcessoFases from "../../models/ProcessoFases";
import buildWhereClause from "../../utils/buildWhereClause";
import builOrderClause from "../../utils/buildOrderClause";
import buildIncludeClause from "../../utils/buildIncludeClause";
import builAttributesClause from "../../utils/buildAttributesClause";
import { model } from "mongoose";

class BucarStatusProcessoPorFaseController {
    async execute(req, res) {
        const processoRepository = new ProcessoRepository()
        const whereClause = buildWhereClause(req.query)
        const orderClause = builOrderClause(req.query)
        const includeClause = buildIncludeClause([
            {
                association: "fases",

                attributes: ['stepId', 'statusId', 'responsavelId', "prazo", "dataConclusao", "dataInicio"],
                include: [
                    {
                        model: Steps,
                        attributes: ["nome"],
                        as: "step"
                    },
                    {
                        model: StatusDeSteps,
                        attributes: ["nome"],
                        as: "status"
                    },
                    {
                        model: Usuarios,
                        attributes: ["nome"],
                        as: "responsavel"
                    }
                ]

            }
        ]);


        const attributesClause = builAttributesClause()
        const attributes = []
        const { rows: processos, count: total } = await Processos.findAndCountAll(
            {
                where: whereClause,

                include: includeClause,

            }
        )
        const Formated = FormatProcesssos(processos)
        return res.status(200).json({
            status: "ok",
            statusCode: 200,
            processos: Formated,

        })

    }
}
export default new BucarStatusProcessoPorFaseController();





// Formatar a resposta para incluir fases no mesmo nível

function FormatProcesssos(processos = []) {
    const formattedProcesses = processos.flatMap(process =>
        process.fases.map(fase => ({
            id: process.id,
            numero: process.numero,
            requerente: process.requerente,
            dataNascimento: process.dataNascimento,
            mob: process.mob,
            genero: process.genero,
            estadoCivil: process.estadoCivil,
            nacionalidade: process.nacionalidade,
            nomePai: process.nomePai,
            nomeMae: process.nomeMae,
            maeNacionalidade: process.maeNacionalidade,
            paiNacionalidade: process.paiNacionalidade,
            passaporteNumero: process.passaporteNumero,
            passaporteDataValidade: process.passaporteDataValidade,
            passaporteDataEmissao: process.passaporteDataEmissao,
            passaporteEmissora: process.passaporteEmissora,
            consulado: process.consulado,
            funcao: process.funcao,
            submetidoPorId: process.submetidoPorId,
            statusId: process.statusId,
            createdAt: process.createdAt,
            updatedAt: process.updatedAt,
            clienteId: process.clienteId,
            beneficiarioId: process.beneficiarioId,
            projectoId: process.projectoId,
            tipoId: process.tipoId,
            tipoVistoId: process.tipoVistoId,
            stepId: fase.stepId,
            statusId: fase.statusId,
            responsavelId: fase.responsavelId,
            prazo: fase.prazo,
            dataConclusao: fase.dataConclusao,
            dataInicio: fase.dataInicio,
            stepNome: fase.step.nome,
            statusNome: fase.status.nome,
            responsavelNome: fase.responsavel ? fase.responsavel.nome : null
        }))
    )
    return formattedProcesses;

}


