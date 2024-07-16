
import { PedidoRepository } from "../../CustomRepositories/PedidoRepository";
import { RequerenteRepository } from "../../CustomRepositories/RequerenteRepository";
import { TipoDePedidoRepository } from "../../CustomRepositories/TipoDePedidoRepository";
import { TipoDeVistoRepository } from "../../CustomRepositories/TipoDeVistoRepository";

import { BadRequestError, ForBiddenError, NotFoundError, UnAuthoriazedError } from "../../helpers/api-errors";

import Pedidos from "../../models/Pedidos";
import Fazes from "../../models/Fazes";
import { Sequelize } from "sequelize";
import { sequelize } from "../../models/Usuarios";

const pendente = 1

class CreatePedidoUsecase {
    async execute({
        tipoVistoId,
        requerenteId,

        tipoId
    }) {
        console.log("requerente ID", requerenteId);
        const pedidoRepository = new PedidoRepository();

        const tipoPedidoRepository = new TipoDePedidoRepository();
        const tipoDePedidoExist = await tipoPedidoRepository.getById({ id: tipoId })

        if (!tipoDePedidoExist) {
            throw new NotFoundError("Id Tipo de pedido  não foi  encontrado!");
        }

        const tipoVistoRepository = new TipoDeVistoRepository();
        const tipoVistoExist = await tipoVistoRepository.getById({ id: tipoVistoId });

        if (!tipoVistoExist) {
            throw new NotFoundError("Id  do Tipo de Visto não foi encontrado!");
        }

        const requerenteRepository = new RequerenteRepository();
        const requerenteExist = await requerenteRepository.getById({ id: requerenteId });

        if (!requerenteExist) {
            throw new NotFoundError("Id requerente não foi encontrado!");
        }
        const novoPedido = await pedidoRepository.create({
            tipoVistoId,
            tipoId: 1,
            requerenteId,
            statusId: pendente
        });
        const { id } = novoPedido;
      
        return novoPedido

    }
}
export default new CreatePedidoUsecase()