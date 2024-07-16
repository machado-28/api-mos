import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError } from "../../helpers/api-errors";
import CreatePedidoUseCase from "../../Usecases/Pedidos/CreatePedidoUseCase";
import { sendWarning} from "../../../socketio";

class CratePedidoController {
    async store(req, res) {
        const schema = yup.object().shape({
            clienteId: yup.string().required(),
            tipoId: yup.string().required(),
            tipoVistoId: yup.string().required(),
            projecto: yup.string().required(),


        });

        let inputValidation = true;

        console.log('BODY', req.body);

        try {
            await schema.validate(req.body);
        } catch (err) {
            console.error(req.body);
            inputValidation = false;
            const erro = err.errors[0];
            throw new BadRequestError(erro); // Lança o erro para a middleware de erros lidar com ele
        }

        const {
            clienteId,
            tipoId,
            tipoVistoId
        } = req.body

        // const pedido = await CreatePedidoUseCase.execute({
        //     tipoVistoId,
        //     requerenteId: clienteId,
        //     tipoId
        // })

        // await sendWarning({
        //     path: "/pedidos/detalhar/" + pedido?.id,
        //     title: "Novo Pedido de Visto",
        //     subtitle:
        //         `um pedido foi agendado pelo usuario,${req.sessao?.nome}, com perfil de:${req.sessao?.painel?.nome}\n Pedido:${pedido}`,

        //     event: "created",
        //     receptor: "ADMINISTRADOR",

        // })

        return res.status(201).json({
            pedido,
            message: "Pedido Submetido com sucesso!!",
            code: 201,
            status: "ok",
        })
    }

}
export default new CratePedidoController()