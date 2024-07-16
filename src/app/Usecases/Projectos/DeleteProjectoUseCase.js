import { ProjectoRepository } from "../../CustomRepositories/ProjectoRepository";
import { UnAuthoriazedError } from "../../helpers/api-errors";

class DeleteProjectoUsecase {
    async execute({ id }) {
        const projectoRepository = new ProjectoRepository();
        const projectoExiste = await projectoRepository.getById({ id });
       
        if (!projectoExiste) {
            throw new UnAuthoriazedError("Id inválido!")
        }
        await projecto(data);
        return true;
    }
}
export default new DeleteProjectoUsecase();