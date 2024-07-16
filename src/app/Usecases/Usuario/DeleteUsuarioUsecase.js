import { UsuarioRepository } from "../../CustomRepositories/UsuarioRepository";
import { ForBiddenError } from "../../helpers/api-errors";

class DeleteUsuarioUsecase {
    async execute({
        id
    }) {

        const usuarioRepository = new UsuarioRepository()

        const usuarioExiste = await usuarioRepository.getById({ id });

        if (usuarioExiste) {
            throw new ForBiddenError("Usuario Inválido!");
        }

        const res = await usuarioRepository.delete({ id })
        return res
    }
}
export default new DeleteUsuarioUsecase()