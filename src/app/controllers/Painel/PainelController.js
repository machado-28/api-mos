import { ProjectoRepository } from "../../CustomRepositories/ProjectoRepository";
import { BadRequestError } from "../../helpers/api-errors";
import Clientes from "../../models/Clientes";
import Usuarios from "../../models/Usuarios";
import createProjectoUseCase from "../../Usecases/Projectos/createProjectoUseCase";
import * as yup from "yup";
import buildWhereClause from "../../utils/buildWhereClause";
import { PainelRepository } from "../../CustomRepositories/PainelRepository";


class PainelController {
    async create(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            descricao
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

        let { nome, gestorExternoId, clienteId, gestorInternoId } = req.body;
        console.log("body", req.body);
        if (gestorInternoId === "") gestorInternoId = null
        const projecto = await createProjectoUseCase.execute({ nome, clienteId, gestorExternoId, gestorInternoId })

        return res.status(201).json({
            projecto,
            status: "ok",
            code: 201
        });

    }

    async count(req, res) {
        const projectoRepository = new ProjectoRepository();
        let query = buildWhereClause(req.query)
        const { orderBy, order } = query
        let attributes = []

        const { total } = await projectoRepository.count({
            whereClause: query,
        });

        return res.json({ total });
    };

    async list(req, res) {
        const painelRepository = new PainelRepository();
        const { order, orderBy } = req.query
        console.log("PARAMS", req.query);
        let attributes = []
        const { painels, total } = await painelRepository.getAllCustom({
            whereClause: req.query, orderClause: [{ orderBy, order, }], attributes,
        })
        return res.status(200).json({
            painels,
            total,
            status: "ok",
            code: 200
        });
    }

    async getOne(req, res) {
        const projectoRepository = new ProjectoRepository();
        const { id } = req.params
        const cargo = await projectoRepository.getById({ id })
        return res.status(200).json({
            projectos,
            status: "ok",
            code: 200
        });

    }
    async update(req, res) {
        const projectoRepository = new ProjectoRepository();
        const { id } = req.params;
        const data = req.body
        const cargo = await projectoRepository.update({ id, data })
        return res.status(201).json({
            message: "operacao realizada com sucesso",
            status: "ok",
            code: 200
        });

    }
    async delete(req, res) {
        const projectoRepository = new ProjectoRepository();
        const { id } = req.params;
        const cargo = await projectoRepository.delete({ id })
        return res.status(200).json({
            message: "operacao realizada com sucesso",
            status: "ok",
            code: 200
        });

    }
    async getOneWithAllProcesses(req, res) {
        const projectoRepository = new ProjectoRepository();
        const { id } = req.params
        const projectos = await projectoRepository.getByIdAllProcesses({ id })

    }

}


export default new PainelController();