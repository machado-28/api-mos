import { FuncionarioRepository } from "../../CustomRepositories/FuncionarioReposoitory";
import { ProcessosRepository } from "../../CustomRepositories/ProcessosReposoitory";
import { BadRequestError } from "../../helpers/api-errors";
import ListProcessoByStatusUsecase from "../../usecases/ListProcessoByStatusUsecase";
import * as yup from "yup";

class UpdateFuncioanarioController {
    async execute(req, res) {
        const { id } = req.params
        const {
            nome,
            cargoId,
            dataNascumento,
            genero,
            nacionalidade,
            nunContaBancaria,
            enderecoId,
            iban,
            dataEntrada,
            dataSaida,
            datavalidadeNif,
            nif,
            salario
        } = req.body

        const funcionarioRepository = new FuncionarioRepository();

        await funcionarioRepository.update({
            nome,
            cargoId,
            dataNascumento,
            genero,
            nacionalidade,
            nunContaBancaria,
            enderecoId,
            iban,
            dataEntrada,
            dataSaida,
            datavalidadeNif,
            nif,
            salario
        })

        return res.status(200).json({ message: "Funcioánario actualizado com sucesso!" });

    }
}

export default new UpdateFuncioanarioController();