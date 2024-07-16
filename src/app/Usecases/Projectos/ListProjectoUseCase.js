import { ProjectoRepository } from "../../CustomRepositories/ProjectoRepository";

class ListProjectoUsecase {
    async execute({ whereClause, orderClause, includeClause, attributesClause }) {
        const projectoRepository = new ProjectoRepository();

        const projectos = await projectoRepository.getAllCustom({
            whereClause,
            orderClause,
            includeClause,
            attributesClause
        });
        return projectos;
    }
}

export default new ListProjectoUsecase();