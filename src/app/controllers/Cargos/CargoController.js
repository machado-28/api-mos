import { BadRequestError } from "../../helpers/api-errors";

import * as yup from "yup";
import createCargoUseCases from "../../usecases/createCargoUseCases";
import { CargosRepository } from "../../CustomRepositories/CargosRepository";


class DepartamentoController {
    async create(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            departamentoId: yup.date().required()
        })
        let inputValidation = true;

        try {
            await schema.validate(req.body);
        } catch (err) {
            console.error(req.body);
            inputValidation = false;
            const erro = err.errors[0];
            throw new BadRequestError(erro); // Lança o erro para a middleware de erros lidar com ele
        }

        const { nome, departamentoId } = req.body;

        const cargo = await createCargoUseCases.execute({ nome, departamentoId })

        return res.status(201).json({ message: "Cargo Criado com sucesso!" });

    }

    async list(req, res) {
        const cargosRepository = new CargosRepository();

        const { cargos, total } = await cargosRepository.getAll();
        return res.status(200).json({ cargos, total });

    }


    async getOne(req, res) {
        const cargosRepository = new CargosRepository();

        const { id } = req.params

        const cargo = await cargosRepository.getById({ id });
        return res.status(200).json({ cargo });

    }
}

export default new DepartamentoController();