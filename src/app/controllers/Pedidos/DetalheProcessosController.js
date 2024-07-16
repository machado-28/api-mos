import { ProcessosRepository } from "../../CustomRepositories/ProcessosReposoitory";

class DetalheProcessosController {
    async execute(req, res) {

        const { id } = req.params;

        const processosRepository = new ProcessosRepository();

        const processo = await processosRepository.getById(id)

        return res.status(200).json({ processo });

    }
}

export default new DetalheProcessosController();