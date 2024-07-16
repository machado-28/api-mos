import { FicheiroRepository } from "../../CustomRepositories/FicheiroRepositorY";
import { PedidoRepository } from "../../CustomRepositories/PedidoRepository"
import { TipoDeVistoRepository } from "../../CustomRepositories/TipoDeVistoRepository";
import VistoRepository from "../../CustomRepositories/VistoRepository";
import { NotFoundError } from "../../helpers/api-errors";

class EmitVistoUseCase {

    async execute({
        processoId,
        numero,
        tipoId,
        dataValidade,
        dataEmissao,
        anexoId
    }) {
        const pedidoRepository = new PedidoRepository();
        const processoIdIsValid = await pedidoRepository.validadteById({ id: processoId })
        if (processoIdIsValid == false) {
            throw new NotFoundError("processoId Invalido")
        }

        const tipoDeVistoRepository = new TipoDeVistoRepository()
        const tipoIdIsValid = tipoDeVistoRepository.validateById({ id: tipoId });

        if (!tipoIdIsValid) {
            throw new NotFoundError("tipo de visto Id Invalido")
        }
        const anexoRepository = new FicheiroRepository()
        const anexoIdIsValid = await anexoRepository.validateById({ id: anexoId })

        if (!anexoIdIsValid) {
            throw new NotFoundError("anexo Id Invalido")
        }
        const vistoRepository = new VistoRepository()
        await vistoRepository.create({
            numero,
            anexoId,
            processoId, tipoId,
            dataEmissao, dataValidade
        })

        return true
    }
}
export default new EmitVistoUseCase()