import { FuncionarioRepository } from "../../CustomRepositories/FuncionarioReposoitory";
import * as yup from "yup";
import Cargos from "../../models/Cargos";

class ListFuncioanarioController {
    async getAll(req, res) {

        const funcionarioRepository = new FuncionarioRepository();

        const { funcionarios, total } = await funcionarioRepository.getAll({
            include:[{
                model:Cargos,
                as:"cargo"
            }]
        })

        return res.status(200).json({funcionarios, total });

    }
}

export default new ListFuncioanarioController();