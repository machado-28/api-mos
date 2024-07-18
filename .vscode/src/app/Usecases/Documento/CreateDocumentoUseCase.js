import { DocumenentoRepository } from "../../CustomRepositories/DocumentosRepository";

class CreateDocumentoUsecase {

    async execute({
        tipoId,
        requerenteId,
        ficheiroId,
        dataValidade,
        anexoId,
        numero,
        dataEmissao,
    }) {

        const documenentoRepository = new DocumenentoRepository();
        const documento = await documenentoRepository.create({
            tipoId,
            numero,
            requerenteId,
            ficheiroId,
            anexoId,
            dataValidade,
            dataEmissao,
        });
       
        return documento
        

    }
}
export default new CreateDocumentoUsecase()