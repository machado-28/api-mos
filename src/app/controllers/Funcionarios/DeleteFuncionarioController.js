import { FuncionarioRepository } from "../../CustomRepositories/FuncionarioReposoitory";

class DeleteFuncioanarioController {
    async execute(req, res) {
        const { id } = req.params
        const funcionarioRepository = new FuncionarioRepository();

        await funcionarioRepository.delete()

        return res.status(200).json({ funcionarios, total });

    }
}

export default new DeleteFuncioanarioController();