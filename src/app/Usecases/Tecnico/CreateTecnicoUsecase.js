import { TecnicoRepository } from "../../CustomRepositories/TecnicoRepository";
import { ForBiddenError } from "../../helpers/api-errors";

class CreateTecnicoUsecase {
    async execute({
        nome,
        avatarId,
        clienteId,

        email, telefone
    }) {

        const tecnicoRepository = new TecnicoRepository()
        // const clienteRepository = new ClienteRe()
        const tecnicoExiste = await tecnicoRepository.getAllCustom({
            whereClause: {
                email, telefone
            }
        });

        if (tecnicoExiste.total > 0) {
            throw new ForBiddenError("tecnico Ja Cadastrado!");
        }

        const novotecnico = await tecnicoRepository.create({
            nome,
            avatarId,
            clienteId,
            email, telefone,


        });
        return novotecnico;
    }
}
export default new CreateTecnicoUsecase()