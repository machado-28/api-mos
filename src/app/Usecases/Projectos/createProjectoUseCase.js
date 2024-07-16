import { ProjectoRepository } from "../../CustomRepositories/ProjectoRepository";
import { ProcessoRepository } from "../../CustomRepositories/PedidoRepository";

import { ForBiddenError, UnAuthoriazedError } from "../../helpers/api-errors";

class CreateProjectoUsecase {

    async execute({
        nome, clienteId, gestorExternoId, gestorInternoId
    }) {
        const projectoRepository = new ProjectoRepository()

        const projectoExiste = await projectoRepository.getByName({ nome, clienteId, });

        if (projectoExiste) {
            throw new UnAuthoriazedError("Projecto já existe!");
        }

        const novoProjecto = await projectoRepository.create({
            nome,
            gestorInternoId,
            gestorExternoId,
            clienteId
        });
        return novoProjecto

    }


}
export default new CreateProjectoUsecase()