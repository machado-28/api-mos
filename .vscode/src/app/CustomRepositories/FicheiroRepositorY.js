import Documentos from "../models/Documentos";
import TipoDocumentos from "../models/TipoDocumentos";
import Ficheiros from "../models/Ficheiros";
import Requerentes from "../models/Requerentes";
import { BadRequestError } from "../helpers/api-errors";

export class FicheiroRepository {
    async create({
        path,
        name
    }) {

        const ficheiroNovo = await Ficheiros.create({
            path,
            name
        });
        return ficheiroNovo;
    }
}