import { BadRequestError, ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Pedidos from "../models/Pedidos";
import Ficheiros from "../models/Ficheiros";
import Requerentes from "../models/Requerentes";
import TipoDocumentos from "../models/TipoFicheiros";
import TipoPedidos from "../models/TipoPedidos";
import TipoVistos from "../models/TipoVistos";
import generateRandomNumber from "../utils/NumeroAleatorio";
import Vistos from "../models/Vistos";
import { Op } from "sequelize";
import { endOfMonth, startOfMonth } from "date-fns";

export class PedidoRepository {
    async create({
        tipoVistoId,
        tipoId,
        requerenteId,
        statusId,
        vistoId
    }) {
        if (!(tipoVistoId || tipoId || requerenteId || fazeId))
            throw new BadRequestError("dados do pedido não foram recebidos pelo backend!");
        const numeroDeQuatroDigitos = generateRandomNumber();

        const numeroDoPedido = "MOS-PDD" + numeroDeQuatroDigitos + new Date().getFullYear()
        const pedidoNovo = await Pedidos.create({
            numero: numeroDoPedido,
            tipoVistoId,
            requerenteId,
            tipoId,
            statusActualId: statusId,
            vistoId
        });
        return pedidoNovo
    }
    async getAll() {
        const { count: total, rows: pedidos } = await Pedidos.findAndCountAll();

        return { total, pedidos }
    }
    async getAllByCliente({ clientId }) {
        const { count: total, rows: pedidos } = await Pedidos.findAndCountAll();

        return { total, pedidos }
    }

    async getAllByDateAndStateAndCliente({ dataInicio = new Date(), dataFim = new Date(), statusId, clientId }) {
        const dataInicioCustom = startOfMonth(new Date(dataInicio));
        const dataFimCustom = endOfMonth(new Date(dataFim));
        const { count: total, rows: pedidos } = await Pedidos.findAndCountAll({
            where: {
                createdAt: {
                    [Op.between]: [dataInicioCustom, dataFimCustom],
                },
                statusId: statusId,
                requerenteId: clientId
            },
        });

        return { total, pedidos }

    }

    async getAllByTipoViso({ tipoVistoId }) {

        const { count: total, rows: pedidos } = await Pedidos.findAndCountAll({
            where: {
                tipoVistoId
            },
        });

        return { total, pedidos }

    }

    async getAllByTipo({ tipoId }) {
        const { count: total, rows: pedidos } = await Pedidos.findAndCountAll({
            where: {
                tipoId
            },
        });

        return { total, pedidos }

    }
    async getAllByProjecto({ projectoId }) {
        const { count: total, rows: pedidos } = await Pedidos.findAndCountAll({
            where: {
                projectoId
            },
        });

        return { total, pedidos }

    }
    async getById({ id }) {
        const pedido = await Pedidos.findOne({
            where: {
                id
            },
        });

        return pedido

    }

    async updateStatus({ id, statusId, descricao }) {
        const pedidoExiste = await this.getById({ id });

        if (!pedidoExiste) {
            throw new NotFoundError("Pedido Id Nao encontrado")
        }
        await pedidoExiste.update({ statusId, descricao })
        return true
    }

    async getAllByDateAndState(dataInicio = new Date(), dataFim = new Date(), statusId) {
        const dataInicioCustom = startOfMonth(new Date(dataInicio));
        const dataFimCustom = endOfMonth(new Date(dataFim));
        const { count: total, rows: pedidos } = await Pedidos.findAndCountAll({
            where: {
                createdAt: {
                    [Op.between]: [dataInicioCustom, dataFimCustom],
                },
                statusId: statusId,
            },
        });

        return { total, pedidos }

    }
}