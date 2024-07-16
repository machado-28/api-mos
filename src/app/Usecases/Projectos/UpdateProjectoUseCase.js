import { ProjectoRepository } from "../../CustomRepositories/ProjectoRepository";
import { UnAuthoriazedError } from "../../helpers/api-errors";

class UpdateProjectoUsecase {
    async execute({ id, clienteId, data }) {
        const projectoRepository = new ProjectoRepository();
        const projectoExiste = await projectoRepository.getById({ id });

        if (!projectoExiste) {
            throw new UnAuthoriazedError("Id inválido!");
        }

        //VERIFICAR SE TEM PERMISSAO...clienteId

        const resp = await projectoRepository.update({ id, data });
        return resp;
    }
}
export default new UpdateProjectoUsecase();