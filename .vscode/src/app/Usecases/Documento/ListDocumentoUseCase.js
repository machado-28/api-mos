import { RequerenteRepository } from "../../CustomRepositories/RequerenteRepository";
import { NotFoundError } from "../../helpers/api-errors";

class ListDocumentoUseCse {

    async getAll({ requerenteId }) {

        const documenentoRepository = new DocumenentoRepository();
        const requerenteRepository = new RequerenteRepository();

        const requerenteExiste = requerenteRepository.getById(requerenteId)


        if (!requerenteExiste) {
            throw NotFoundError("Requerente nao encontrado!")
        }
        const documentos = await documenentoRepository.getAll({ requerenteId });

        return documentos

    }
}
export default new ListDocumentoUseCse()