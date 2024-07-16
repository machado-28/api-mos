import Documentos from "../models/Documentos";
import TipoDocumentos from "../models/TipoFicheiros";
import Ficheiros from "../models/Ficheiros";
import Requerentes from "../models/Requerentes";
import { BadRequestError } from "../helpers/api-errors";

export class DocumenentoRepository {
    async create({
        dataEmissao,
        dataValidade,
        numero,
        emissora,
        pedidoId,
        anexoId,
        requerenteId,
        tipoId
    }) {
        console.log("ITPO DOCUME", tipoId);
        const documentoNovo = await Documentos.create({
            dataEmissao,
            dataValidade,
            numero,
            emissora,
            pedidoId,
            anexoId,
            requerenteId,
            tipoId
        });

        return documentoNovo;
    }

    async getOneByNumero({ numero }) {
        const documento = await Documentos.findOne({
            where: {
                numero,
            },
            include: [
                {
                    model: Requerentes,
                    as: "requerente"
                },
                {
                    model: Ficheiros,
                    as: "anexo",

                },

            ]
        });
        return documento;
    };

    async getByPedidoId({ pedidoId }) {
        if (!pedidoId) {
            throw new BadRequestError("pedido Id nao recebido!")
        }

        const documentos = await Documentos.findAll({
            where: {
                pedidoId,
            },
            include: [

                {
                    model: Ficheiros,

                    as: "anexo",

                },
                {
                    model: TipoDocumentos,
                    as: "tipo"
                }

            ]
        })
        return documentos
    };

    async update({ id, numero, dataEmissao, dataValidade, ficheiroId }) {
        const existDocumento = await Documentos.findOne({ where: { id } });
        if (!existDocumento)
            throw new BadRequestError("Documento não encontrado");

        await existDocumento.update({ numero, dataEmissao, dataValidade, ficheiroId });

        return existDocumento;

    }

    async delete() {

    }

    async count({ whereClause }) {
        const cliente =
            await Documentos.count(
                {
                    where: whereClause,
                });
        console.log("TOTAL=>", cliente);
        return { total: cliente }
    };

}