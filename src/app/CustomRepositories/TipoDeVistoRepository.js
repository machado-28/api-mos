
import { BadRequestError } from "../helpers/api-errors";
import TipoVistos from "../models/TipoVistos";

export class TipoDeVistoRepository {
    async validateById({ id }) {
        const isValid = await TipoVistos.findOne({ id })
        console.log("RESUL", isValid);
        if (!isValid) return false
        return true
    }
    async getById({ id }) {
        const tipoVisto = await TipoVistos.findOne({
            where: {
                id
            },

        });
        return tipoVisto;
    };

    async getAll() {
        const tiposVisto = await TipoVistos.findAll();
        return tiposVisto;
    };

    async update({ id, nome, descricao, duracao, viaPermitida }) {
        const exisTipoVisto = await TipoVistos.findOne({ where: { id } });
        if (!exisTipoVisto)
            throw new BadRequestError("tipo  de visto não encontrado");

        await exisTipoVisto.update({ nome, descricao, duracao, viaPermitida });

        return exisTipoVisto;
    }

    async delete() {

    }

}