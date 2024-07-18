import { Sequelize } from "sequelize";
import { DocumenentoRepository } from "../../CustomRepositories/DocumentosRepository";
import { PedidoRepository } from "../../CustomRepositories/PedidoRepository";
import { RequerenteRepository } from "../../CustomRepositories/RequerenteRepository";
import { TipoDePedidoRepository } from "../../CustomRepositories/TipoDePedidoRepository";
import { TipoDeVistoRepository } from "../../CustomRepositories/TipoDeVistoRepository";

import { ForBiddenError, NotFoundError, UnAuthoriazedError } from "../../helpers/api-errors";
import Documentos from "../../models/Documentos";
import Pedidos from "../../models/Pedidos";

const activo = 1
class CreatePedidoDeEmissaoUsecase {
    async execute({
        tipoVistoId,
        requerenteId,
        numeroPassaporte
    }) {

        const documentoExist = await Documentos.findOne({
            where: { numero: numeroPassaporte },
            include: [
                {
                    model: Pedidos,
                    as:"pedido",
                    where: {
                        tipoid: 1,
                        tipoVistoId
                    }
                }
            ]
        })
        if (documentoExist)
            throw new UnAuthoriazedError("pedido ja em andamento submetido com o este passaprte")

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
            statusId: activo
        });
        return novoPedido

    }
}
export default new CreatePedidoDeEmissaoUsecase()