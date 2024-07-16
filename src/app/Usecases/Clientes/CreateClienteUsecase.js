import { Op } from "sequelize";
import { ClienteRepository } from "../../CustomRepositories/ClienteRepository";
import { ForBiddenError } from "../../helpers/api-errors";
import CreateUsuarioUsecase from "../Usuario/CreateUsuarioUsecase";

class CreateclienteUsecase {
    async execute({
        nome,
        telefone1,
        telefone2,
        email,
        usuario,
        senha,
        nomeEmpresa,
        nif,
        ramo,
        site,
        provincia,
        municipio,
        comuna,
        cidade,
        usuarioId

    }) {

        const clienteRepository = new ClienteRepository()
        // const clienteRepository = new ClienteRe();

        const clienteExiste = await clienteRepository.getAllCustom({

            whereClausule: {
                [Op.or]:
                    [
                        { email },
                        { telefone1 },
                        { telefone2 },

                        { nif },
                    ]
            },
        });

        if (clienteExiste.total > 0) {
            throw new ForBiddenError("cliente já cadastrado!");
        }

        const novocliente = await clienteRepository.create({
            nome,
            telefone1,
            telefone2,
            email,
            usuario,
            senha,
            nomeEmpresa,
            nif,
            ramo,
            site,
            provincia,
            municipio,
            comuna,
            cidade,
            usuarioId

        });

        const { id: clienteId } = novocliente
        console.log("Id PAINEL ",);
        const login = await CreateUsuarioUsecase.execute({ email, telefone: telefone1, painelId: 10, nome, senha, clienteId, usuario, })

        return novocliente;
    }

}
export default new CreateclienteUsecase()