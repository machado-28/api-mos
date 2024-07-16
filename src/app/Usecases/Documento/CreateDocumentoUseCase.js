import { DocumenentoRepository } from "../../CustomRepositories/DocumentosRepository";

class CreateDocumentoUsecase {

    async execute({
        dataEmissao,
        dataValidade,
        numero,
        emissora,
        pedidoId,
        anexoId,
        requerenteId,
        tipoId
    }) {

        const documenentoRepository = new DocumenentoRepository();
        const documento = await documenentoRepository.create({
            tipoId,
            numero,
            requerenteId,
            pedidoId,
            emissora,
            anexoId,
            dataValidade,
            dataEmissao,
        });

        return documento


    }
}
export default new CreateDocumentoUsecase()