import { FicheiroRepositorYRepository } from "../../CustomRepositories/FicheiroRepositorY";
import EnviarEmailUseCase from "../../Usecases/Email/enviarEmailUseCase";

class ListDocumentoController {
    async getAll(req, res) {
        const { numero, pedidoId, requerenteId } = req.query
        const documentoRepository = new FicheiroRepositorYRepository();
        let documentos
        if (pedidoId) {
            documentos = await documentoRepository.getByPedidoId({
                pedidoId
            })

        }
        await EnviarEmailUseCase.execute()
        return res.status(200).json({ documentos });

    }
}

export default new ListDocumentoController();