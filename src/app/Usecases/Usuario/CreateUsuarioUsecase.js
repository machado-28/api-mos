import { UsuarioRepository } from "../../CustomRepositories/UsuarioRepository";
import { ForBiddenError } from "../../helpers/api-errors";

class CreateUsuarioUsecase {
    async execute({
        nome,
        usuario,
        senha,
        avatarId,
        clienteId,
        painelId,
        email, telefone
    }) {

        const usuarioRepository = new UsuarioRepository()
        // const clienteRepository = new ClienteRe()
        const usuarioExiste = await usuarioRepository.getAllCustom({
            whereClause: {
                usuario, email, telefone
            }
        });

        if (usuarioExiste.total > 0) {
            throw new ForBiddenError("Usuario Inválido!");
        }

        const novoUsuario = await usuarioRepository.create({
            nome,
            usuario,
            senha,
            avatarId,
            clienteId,
            email, telefone,
            painelId

        });
        return novoUsuario;
    }
}
export default new CreateUsuarioUsecase()