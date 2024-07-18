import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import CreateUsuarioUsecase from "../../Usecases/Usuario/CreateUsuarioUsecase";
import { UsuarioRepository } from "../../CustomRepositories/UsuarioRepository";


class UsuarioController {
    async store(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            painelId: yup.string().required(),
            senha: yup.string().required().min(6),
            avatarId: yup.string().required(),

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
            avatarId
        } = req.body


        await CreateUsuarioUsecase({
            nome,
            usuario,
            senha,
            avatarId
        });

        return res.status(201).json({ message: "Usuario Criado com sucesso!" })
    }

    async detail(req, res) {
        const { id } = req.params;
        const usuarioRepository = new UsuarioRepository();

        const usuarioExiste = await usuarioRepository.getById({ id });

        if (!usuarioExiste) {
            throw new NotFoundError("Usuario invalido!");
        }

        return res.status(200).json({
            user: usuarioExiste
        });

    }

}
export default new UsuarioController()