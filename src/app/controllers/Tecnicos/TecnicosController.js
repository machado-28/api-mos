import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import CreateTecnicoUsecase from "../../Usecases/Tecnico/CreateTecnicoUsecase.js";
import { TecnicoRepository } from "../../CustomRepositories/TecnicoRepository";
import buildWhereClause from "../../utils/buildWhereClause";
import builAttributesClause from "../../utils/buildAttributesClause";

import Painels from "../../models/Painels";
import Clientes from "../../models/Clientes";
import Ficheiros from "../../models/Ficheiros.js";


class TecnicosController {
    async store(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            avatarId: yup.string(),
            clienteId: yup.string(),
            email: yup.string().email().required(),
            telefone: yup.string().required(),

        });

        let inputValidation = true;

        try {
            await schema.validate(req.body);
        } catch (err) {
            console.error(req.body);
            inputValidation = false;
            const erro = err.errors[0];
            throw new BadRequestError(erro); // Lança o erro para a middleware de erros lidar com ele
        }


        const {
            nome,

            avatarId,
            clienteId,

            email, telefone
        } = req.body


        await CreateTecnicoUsecase.execute({
            nome,

            avatarId,
            clienteId,

            email, telefone
        });

        return res.status(201).json({ message: "Tecnico Criado com sucesso!" })
    }

    async detail(req, res) {
        const id = req.sessao.id

        const tecnicoRepository = new TecnicoRepository();

        const usuarioExiste = await tecnicoRepository.getById({ id });

        if (!usuarioExiste) {

            throw new NotFoundError("Usuario invalido!");
        }

        return res.status(200).json({
            user: usuarioExiste
        });

    }

    async count() {
        const tecnicoRepository = new TecnicoRepository();

        let query = buildWhereClause(req.query)
        const { orderBy, order } = query
        let attributes = []


        const { total } = await tecnicoRepository.count({
            whereClause: query,
        })
        return res.json({ total })
    }
    async list(req, res) {
        const tecnicoRepository = new TecnicoRepository();

        let query = buildWhereClause(req.query)
        const { orderBy, order } = query
        let attributes = []


        const { total, tecnicos } = await tecnicoRepository.getAllCustom({
            whereClause: query, orderClause: [{ orderBy, order, }], attributes, includeClause: [{
                model: Clientes,
                as: "cliente",
                attributes: ["id", "nome"],
            },
            {
                model: Ficheiros,
                as: "avatar",
                attributes: ["id", "path", "name", "url"],
            }

            ]
        })
        return res.json({ tecnicos, total })
    }

    async update(req, res) {
        const tecnicoRepository = new TecnicoRepository();
        const { id } = req.params;
        const data = req.body
        const cargo = await tecnicoRepository.update({ id, data })
        return res.status(201).json({
            message: "operacao realizada com sucesso",
            status: "ok",
            code: 200
        });

    }
    async delete(req, res) {
        const tecnicoRepository = new tecnicoRepository();
        const { id } = req.params;
        const cargo = await tecnicoRepository.delete({ id })
        return res.status(200).json({
            message: "operacao realizada com sucesso",
            status: "ok",
            code: 200
        });

    }

}
export default new TecnicosController()