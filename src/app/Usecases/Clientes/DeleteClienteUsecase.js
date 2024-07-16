import { ClienteRepository } from "../../CustomRepositories/ClienteRepository";
import { ForBiddenError } from "../../helpers/api-errors";

class DeleteClienteUsecase {
    async execute({
        id
    }) {

        const clienteRepository = new ClienteRepository()

        const clienteExiste = await clienteRepository.getById({ id });

        if (clienteExiste) {
            throw new ForBiddenError("cliente Inválido!");
        }

        const res = await clienteRepository.delete({ id })
        return res
    }
}
export default new DeleteUsuarioUsecase()