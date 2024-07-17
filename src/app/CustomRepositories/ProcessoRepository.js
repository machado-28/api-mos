import { BadRequestError, ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Processos from "../models/Processos";
import Ficheiros from "../models/Ficheiros";
import Requerentes from "../models/Requerentes";
import generateRandomNumber from "../utils/NumeroAleatorio";
import Vistos from "../models/Vistos";
import CreateProcessoUseCase from "../Usecases/Processos/CreateProcessoUseCase";
import Progressos from "../models/ProgressoProcessos";
import buildWhereClause from "../utils/buildWhereClause";
import buildIncludeClause from "../utils/buildIncludeClause";
import builOrderClause from "../utils/buildOrderClause";
import builAttributesClause from "../utils/buildAttributesClause";
import ProgressoProcessos from "../models/ProgressoProcessos";


export class ProcessoRepository {
    async create({
        nome,
        dataNascimento,
        genero,
        estadoCivil,
        nacionalidade,
        nomePai,
        nomeMae,
        maeNacionalidade,
        paiNacionalidade,
        vistoId,
        cidadeEndereco,
        passaporteNumero,
        passaporteEmissora,
        passaporteDataValidade,
        passaporteDataEmissao,
        mob,
        dataValidade,
        tipoVistoId,
        tipoId,
        projectoId,
        dataEmissao,
        sindicato,
        funcao,
        clienteId,
        beneficiarioId,
        paisNascimento,

    }) {
        const numeroDeQuatroDigitos = generateRandomNumber();
        const numeroDoProcesso = "MOS-PSS" + numeroDeQuatroDigitos + new Date().getFullYear();
        console.log("DATA RECEIVEB", {
            nome,
            dataNascimento,
            genero,
            estadoCivil,
            nacionalidade,
            nomePai,
            nomeMae,
            maeNacionalidade,
            paiNacionalidade,
            vistoId,
            cidadeEndereco,
            passaporteNumero,
            passaporteEmissora,
            passaporteDataValidade,
            passaporteDataEmissao,
            mob,
            dataValidade,
            tipoVistoId,
            tipoId,
            projectoId,
            dataEmissao,
            sindicato,
            funcao,
            clienteId,
            beneficiarioId,
            paisNascimento,
        });
        const { id: processoId } = await Processos.create({
            numero: numeroDoProcesso,
            nome,
            dataNascimento,
            genero,
            estadoCivil,
            nacionalidade,
            nomePai,
            nomeMae,
            maeNacionalidade,
            paiNacionalidade,
            vistoId,
            cidadeEndereco,
            passaporteNumero,
            passaporteEmissora,
            passaporteDataValidade,
            passaporteDataEmissao,
            mob,
            dataValidade,
            tipoVistoId,
            tipoId,
            projectoId,
            dataEmissao,
            sindicato,
            funcao,
            clienteId,
            beneficiarioId,

            paisNascimento,
        });
        await Progressos.create({
            processoId,
            clienteId,
            statusId: 1,
            stepId: 1
        })
        return true
    }
    async getAllCustom({ whereClause, orderClause, includeClause, attributesClause, attributes }) {
        const { rows: processos, count: total } = await Processos.findAndCountAll({
            where: buildWhereClause(whereClause),
            include: buildIncludeClause(includeClause),
            order: [builOrderClause(orderClause)],
            attributes: builAttributesClause(attributes)
        });
        return { processos, total }
    };
    async progresso({ whereClause, orderClause, includeClause, attributesClause, attributes }) {
        const { rows: progresso, count: total } = await ProgressoProcessos.findAndCountAll({
            where: buildWhereClause(whereClause),
            include: buildIncludeClause(includeClause),
            order: [builOrderClause(orderClause)],
            attributes: builAttributesClause(attributes)
        });
        return { progresso, total }
    };


    async count({ whereClause }) {
        const processos =
            await Processos.count(
                {
                    where: whereClause,
                });
        console.log("TOTAL=>", processos);
        return { total: processos }
    };

}