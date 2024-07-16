import TipoDocumentos from "../models/TipoFicheiros";
import Ficheiros from "../models/Ficheiros";
import Requerentes from "../models/Requerentes";
import { BadRequestError } from "../helpers/api-errors";

export class FicheiroRepository {
    async validateById({ id }) {
        const isValid = await Ficheiros.findOne({ id })

        if (!isValid) return false
        return true
    }
    async create({
        path,
        name,
        tipoId,

        pedidoId,
        processoId
    }) {

        const ficheiroNovo = await Ficheiros.create({
            path,
            name,
            tipoId,

            pedidoId,
            processoId
        });
        return ficheiroNovo;
    }
    async count({ whereClause }) {
        const cliente =
            await Ficheiros.count(
                {
                    where: whereClause,
                });
        console.log("TOTAL=>", cliente);
        return { total: cliente }
    };
}