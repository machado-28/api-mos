import { BadRequestError } from "../../helpers/api-errors";

import * as yup from "yup";
import createDepartamentoUseCases from "../../usecases/createDepartamentoUseCases";
import { DepartamentoRepository } from "../../CustomRepositories/DepartamentoRepository";


class DepartamentoController {
    async create(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            horaEntrada: yup.string().required()
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


        const { nome, horaEntrada } = req.body
        const departamento = await createDepartamentoUseCases.execute({ nome, horaEntrada })

        return res.status(201).json({ message: "departamento Criado com sucesso!" });

    }

    async list(req, res) {
        const departamentoRepository = new DepartamentoRepository();

        const { departamentos, total } = await departamentoRepository.getAll();
        return res.status(200).json({ departamentos, total });

    }


    async getOne(req, res) {
        const departamentoRepository = new DepartamentoRepository();

        const { id } = req.params

        const departamento = await departamentoRepository.getById({ id });
        return res.status(200).json({ departamento });

    }
}

export default new DepartamentoController();