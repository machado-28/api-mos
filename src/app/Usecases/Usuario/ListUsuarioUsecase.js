import { UsuarioRepository } from "../../CustomRepositories/UsuarioRepository";
import { ForBiddenError } from "../../helpers/api-errors";

export class ListUsuarioUsecase {

    async execute() {
        const usuarioRepository = new UsuarioRepository()
        const usuarios = await usuarioRepository.getAll();
        return usuarios

    }
}
export default new ListUsuarioUsecase()