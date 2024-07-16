import { UsuarioRepository } from "../../CustomRepositories/UsuarioRepository";
import { ForBiddenError } from "../../helpers/api-errors";

class UpdateUsuarioUsecase {
    async execute({
        id,
        data
    }) {

        const usuarioRepository = new UsuarioRepository()
        // const clienteRepository = new ClienteRe()
        const usuarioExiste = await usuarioRepository.getById({ id });

        if (usuarioExiste) {
            throw new ForBiddenError("Usuario Inválido!");
        }

        const updateUsuario = await usuarioRepository.update({ id, data })
        return updateUsuario;
    }
}
export default new UpdateUsuarioUsecase()