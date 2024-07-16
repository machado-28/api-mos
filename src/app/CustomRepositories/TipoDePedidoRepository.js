
import { BadRequestError } from "../helpers/api-errors";
import TipoPedidos from "../models/TipoPedidos";

export class TipoDePedidoRepository {
    async getById({ id }) {
        console.log("TIPO PEGADO!", id);
        const pedido = await TipoPedidos.findOne({
            where: {
                id
            },

        });
        return pedido;
    };
    async getAll() {
        const tiposPedido = await TipoPedidos.findAll();
        return tiposPedido;
    };

    async update({ id, nome, descricao, }) {
        if (!id)
            throw new BadRequestError("id do tipo de Pedido nao foi encontrado!");
        const exisTipoPedido = await TipoPedidos.findOne({ where: { id } });
        if (!exisTipoPedido)
            throw new BadRequestError(" Tipo de pedido não encontrado");

        await exisTipoPedido.update({ nome, descricao, viaPermitida });

        return exisTipoPedido;
    }

    async delete() {

    }

}