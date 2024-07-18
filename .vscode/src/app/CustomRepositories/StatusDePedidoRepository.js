
import { BadRequestError } from "../helpers/api-errors";
import StatusDePedidos from "../models/StatusDePedidos";

export class StatusDePedidoRepository {
    async getById({ id }) {
        const statusDePedido = await StatusDePedidos.findOne({
            where: {
                id
            },
        });
        return statusDePedido;
    };

    async getAll() {
        const statusPedido = await StatusDePedidos.findAll();
        return statusPedido;
    };

    async update({ id, nome, descricao, }) {
        const exisStatusPedido = await StatusDePedidos.findOne({ where: { id } });
        if (!exisStatusPedido)
            throw new BadRequestError("status id do processo não encontrado");

        await exisStatusPedido.update({ nome, descricao, });

        return exisStatusPedido;
    }

    async delete() {

    }

}