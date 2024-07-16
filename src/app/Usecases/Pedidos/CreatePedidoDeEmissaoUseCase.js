
import { DocumenentoRepository } from "../../CustomRepositories/DocumentosRepository";
import { PedidoRepository } from "../../CustomRepositories/PedidoRepository";
import { RequerenteRepository } from "../../CustomRepositories/RequerenteRepository";
import { TipoDePedidoRepository } from "../../CustomRepositories/TipoDePedidoRepository";
import { TipoDeVistoRepository } from "../../CustomRepositories/TipoDeVistoRepository";

import { BadRequestError, ForBiddenError, NotFoundError, UnAuthoriazedError } from "../../helpers/api-errors";
import Documentos from "../../models/Documentos";
import Pedidos from "../../models/Pedidos";
import Fazes from "../../models/Fazes";
import { Sequelize } from "sequelize";
import { sequelize } from "../../models/Usuarios";
import { sendMessage } from "../../../socketio";

const activo = 1
const pedidoDeEmissaoId = 1
class CreatePedidoDeEmissaoUsecase {
    async execute({
        tipoVistoId,
        requerenteId,
        fazeId
    }) {
        console.log("requerente ID", requerenteId);
        const pedidoRepository = new PedidoRepository();

        const tipoPedidoRepository = new TipoDePedidoRepository();
        const tipoDePedidoExist = await tipoPedidoRepository.getById({ id: pedidoDeEmissaoId })

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
            fazeId,
            requerenteId,
            statusId: activo
        });
        const { id } = novoPedido;

        const faze = await Fazes.findOne({ where: { id: 1 } })
        if (faze) {
            // Adiciona a fase ao pedido e associa uma descrição usando o método `addFazes`
            const res = await novoPedido.addFazes(faze, { through: { statusId: activo, descricao: "Fase Inicial" } });
            console.log(res);
        } else {
            throw new BadRequestError("Faze ID Nao Encontrada")
            console.error("Fase não encontrada");
        }

        // Passa o ID da fase e a descrição como um array de objetos

        // const query = `INSERT INTO PedidoFazes (fazeId, pedidoId) VALUES (6, ${novoPedido.id})`;

        // // Execute a consulta SQL com o ID numérico do pedido
        // // Certifique-se de substituir 6 pelo ID da fase apropriado

        // const result = await sequelize.query(query)
        // return result

        sendMessage({
            data: {
                message: `um pedido foi agendado pelo usuario,${req.sessao?.usuario?.nome},\n Pedido:${novo}`,
                
            }
        })
        return novoPedido

    }
}
export default new CreatePedidoDeEmissaoUsecase()