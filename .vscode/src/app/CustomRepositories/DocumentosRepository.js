import Documentos from "../models/Documentos";
import TipoDocumentos from "../models/TipoDocumentos";
import Ficheiros from "../models/Ficheiros";
import Requerentes from "../models/Requerentes";
import { BadRequestError } from "../helpers/api-errors";

export class DocumenentoRepository {
    async create({
        numero,
        requrenteId,
        pedidoId,
        dataEmissao,
        dataValidade,
        anexoId
    }) {

        const documentoNovo = await Documentos.create({
            numero,
            requrenteId,
            pedidoId,
            dataEmissao,
            dataValidade,
            anexoId
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

        const documentos = await Documentos.findAndCountAll({
            where: {
                pedidoId,
            },
            include: [
                {
                    model: Requerentes,
                    as: "requerente"
                },
                {
                    model: Ficheiros,
                    as: "anexos",
                    include: [
                        {
                            model: TipoDocumentos,
                            as: "tipo"
                        }
                    ]
                },

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

}