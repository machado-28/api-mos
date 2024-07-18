
import { BadRequestError } from "../helpers/api-errors";
import TipoDocumentos from "../models/TipoDocumentos";

export class TipoDeDocumentoRepository {
    async getById({ id }) {
        const tipoDocumento = await TipoDocumentos.findOne({
            where: {
                id
            },

        });
        return tipoDocumento;
    };

    async getAll() {
        const tiposVisto = await TipoDocumentos.findAll();
        return tiposVisto;
    };

    async update({ id, nome, descricao, duracao, viaPermitida }) {
        const exisTipoDocumento = await TipoDocumentos.findOne({ where: { id } });
        if (!exisTipoDocumento)
            throw new BadRequestError("tipo  de visto não encontrado");

        await exisTipoDocumento.update({ nome, descricao, duracao, viaPermitida });

        return exisTipoDocumento;
    }

    async delete() {

    }

}