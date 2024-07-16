import { PedidoRepository } from "../../CustomRepositories/PedidoRepository";
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import * as yup from "yup";

class UpdatePedidoController {
    async execute(req, res) {
        const schema = yup.object().shape({
            descricao: yup.string(),
            statusId: yup.string().required(),
        });

        let inputValidation = true;
        const { tipoVistoId = 1 } = req.params
        req.body.tipoVistoId = tipoVistoId
        console.log('BODY', req.body);

        try {
            await schema.validate(req.body);
        } catch (err) {
            console.error(req.body);
            inputValidation = false;
            const erro = err.errors[0];
            throw new BadRequestError(erro); // Lança o erro para a middleware de erros lidar com ele
        }

        const { id } = req.params;

        const { descricao, statusId } = req.body
        console.log("corpo da loci 7 params", req.body, req.parms);

        const pedidoRepository = new PedidoRepository();

        const aceite = await pedidoRepository.updateStatus({ id, descricao, statusId });

        if (!aceite) {
            throw new BadRequestError("Impossível executar esta acção!")
        }
        return res.status(200).json({ message: "Operação realizada com sucessodsdsd!" })

    }

}

export default new UpdatePedidoController()