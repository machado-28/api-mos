import { BadRequestError, ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Pedidos from "../models/Pedidos";
import Ficheiros from "../models/Ficheiros";
import Requerentes from "../models/Requerentes";
import TipoDocumentos from "../models/TipoFicheiros";
import TipoPedidos from "../models/TipoPedidos";
import TipoVistos from "../models/TipoVistos";
import generateRandomNumber from "../utils/NumeroAleatorio";
import Vistos from "../models/Vistos";

export class PedidoRepository {
    async validadteById({ id }) {
        const pedido = await Pedidos.findOne({
            where: {
                id,
            },
        })

        if (!pedido) return false
        return true
    }
    async getById({ id }) {
        const pedido = await Pedidos.findOne({
            where: {
                id,

            },
            include: [
                {
                    model: Requerentes,
                    as: "requerente"
                },
                {
                    model: TipoPedidos,
                    as: "tipo"
                },
                {
                    model: TipoVistos,
                    as: "tipoVisto"
                },

                {
                    association: "documentos",
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
                }
            ]
        });
        return pedido;
    };

    async getAll() {
        const { rows: pedidos, count: total } = await Pedidos.findAndCountAll({
            where: {
                id,

            },
            include: [
                {
                    model: Requerentes,
                    as: "requerente"
                },
                {
                    model: TipoPedidos,
                    as: "tipo"
                },
                {
                    model: TipoVistos,
                    as: "tipoVisto"
                },
                {
                    model: Vistos,
                    as: "visto"
                },
                {
                    association: "documentos",
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
                }
            ]
        });
        return { pedidos, total }
    };

    async update({ statusId }) {
        const usuarioExiste = await this.getById

        if (!usuarioExiste) throw new NotFoundError("usuario invalido");

        const actualizado = await usuarioExiste.update({ nome, painel, usuario, avatarId })
        return actualizado
    }

    async getAllByStatusId({ tipoId, statusId }) {

        const { rows: pedidos, count: total } = await Pedidos.findAndCountAll({
            where: {
                tipoId,
                statusId,
            },
            include: [
                {
                    model: Requerentes,
                    as: "requerente"
                },
                {
                    model: TipoPedidos,
                    as: "tipo"
                },
                {
                    model: TipoVistos,
                    as: "tipoVisto"
                },
                {
                    model: Vistos,
                    as: "visto"
                },
                {
                    association: "documentos",
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
                }
            ]
        });
        return { pedidos, total }
    }

    async getByFaze({
        fazeId,
    }) {
        const { rows: pedidos, count: total } = await Pedidos.findAndCountAll({
            where: {
                fazeId
            },
            include: [
                {
                    model: Requerentes,
                    as: "requerente"
                },
                {
                    model: TipoPedidos,
                    as: "tipo"
                },
                {
                    model: TipoVistos,
                    as: "tipoVisto"
                },
                {
                    model: Vistos,
                    as: "visto"
                },
                {
                    association: "documentos",
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
                }
            ]
        });
        return { pedidos, total }
    }
    async create({
        tipoVistoId,
        tipoId,
        requerenteId,
        statusId,
        fazeId,
        vistoId
    }) {
        if (!(tipoVistoId || tipoId || requerenteId || fazeId))
            throw new BadRequestError("dados do pedido não foram recebidos pelo backend!");
        const numeroDeQuatroDigitos = generateRandomNumber();

        const numeroDoPedido = "MOS-" + numeroDeQuatroDigitos + new Date().getFullYear()
        const pedidoNovo = await Pedidos.create({
            numero: numeroDoPedido,
            tipoVistoId,
            requerenteId,
            tipoId,
            fazeActualId: fazeId,
            statusActualId: statusId,
            vistoId
        })
        return pedidoNovo
    }

}