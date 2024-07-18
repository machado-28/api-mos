import { DocumenentoRepository } from "../../CustomRepositories/DocumentosRepository";

class ListDocumentoController {
    async getOne(req, res) {
        const { numero } = req.params
        const documentoRepository = new DocumenentoRepository();

        const documento = await documentoRepository.getOneByNumero({
            numero
        })

        return res.status(200).json(documento);

    }
}

export default new ListDocumentoController();