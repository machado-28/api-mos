import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import CreateUsuarioUsecase from "../../Usecases/Usuario/CreateUsuarioUsecase";
import { UsuarioRepository } from "../../CustomRepositories/UsuarioRepository";
import buildWhereClause from "../../utils/buildWhereClause";
import builAttributesClause from "../../utils/buildAttributesClause";
import { model } from "mongoose";
import Painels from "../../models/Painels";
import Clientes from "../../models/Clientes";


class GestoresController {
    async store(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            painelId: yup.string().required(),
            senha: yup.string().required().min(6),
            avatarId: yup.string(),
            clienteId: yup.string(),
            email: yup.string().email(),
            telefone: yup.string(),
            usuario: yup.string().required(),


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
            usuario,
            senha,
            avatarId,
            clienteId,
            painelId,
            email, telefone
        } = req.body


        await CreateUsuarioUsecase.execute({
            nome,
            usuario,
            senha,
            avatarId,
            clienteId,
            painelId,
            email, telefone
        });

        return res.status(201).json({ message: "Gestor Criado com sucesso!" })
    }

    async detail(req, res) {
        const id = req.sessao.id

        const usuarioRepository = new UsuarioRepository();

        const usuarioExiste = await usuarioRepository.getById({ id });

        if (!usuarioExiste) {

            throw new NotFoundError("Usuario invalido!");
        }

        return res.status(200).json({
            user: usuarioExiste
        });

    }

    async count(req, res) {
        const usuarioRepository = new UsuarioRepository();

        let query = buildWhereClause(req.query)
        const { orderBy, order } = query
        let attributes = []


        const { total } = await usuarioRepository.count({
            whereClause: query,
        })
        return res.json({ total })
    }
    async list(req, res) {
        const usuarioRepository = new UsuarioRepository();

        let query = buildWhereClause(req.query)
        const { orderBy, order } = query
        let attributes = []


        const { total, usuario } = await usuarioRepository.getAllCustom({
            whereClause: query, orderClause: [{ orderBy, order, }], attributes, includeClause: [{
                model: Painels,
                as: "painel",
                attributes: ["id", "nome"],

            }, {
                model: Clientes,
                as: "cliente",
                attributes: ["id", "nome"],
            },

            ]
        })
        return res.json({ gestores: usuario, total })
    }

}
export default new GestoresController()