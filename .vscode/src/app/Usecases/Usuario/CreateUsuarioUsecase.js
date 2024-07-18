import { UsuarioRepository } from "../../CustomRepositories/UsuarioRepository";
import { ForBiddenError } from "../../helpers/api-errors";

class CreateUsuarioUsecase {

    async execute({ nome, senha, usuario, avatarId, painelId }) {
        const usuarioRepository = new UsuarioRepository()
        const usuarioExiste = await usuarioRepository.getByUsuario({ usuario });

        if (usuarioExiste) {
            throw new ForBiddenError("Usuario Inválido!");
        }

        const novoUsuario = await usuarioRepository.create({ nome, senha, usuario, avatarId, painelId });
        return novoUsuario

    }
}