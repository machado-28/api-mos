import { ClienteRepository } from "../../CustomRepositories/ClienteRepository";

export class ListClienteUsecase {

    async execute({ whereClausule }) {
        const clienteRepository = new ClienteRepository()
        const clientes = await clienteRepository.getAllCustom({ whereClausule });
        return clientes

    }
}
export default new ListClienteUsecase()