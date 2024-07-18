
import { ClienteRepository } from "../../CustomRepositories/ClienteRepository";
import { ProcessoRepository } from "../../CustomRepositories/ProcessoRepository";
import { ProjectoRepository } from "../../CustomRepositories/ProjectoRepository";
import { TecnicoRepository } from "../../CustomRepositories/TecnicoRepository";
import { TipoDePedidoRepository } from "../../CustomRepositories/TipoDePedidoRepository";
import { TipoDeVistoRepository } from "../../CustomRepositories/TipoDeVistoRepository";
import { NotFoundError } from "../../helpers/api-errors";
import ProgressoProcessos from "../../models/ProgressoProcessos";

const pendente = 1

class updateStepAndStatusProcessoUsecase {
    async statusAndStep({
        statusId, stepId, processoId, descricao

    }) {

        const processoRepository = new ProcessoRepository();
        await processoRepository.updateStepAndStatus({ statusId, stepId, descricao, processoId });
        return true

    }
}
export default new updateStepAndStatusProcessoUsecase()