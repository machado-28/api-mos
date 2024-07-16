import { BadRequestError, ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Clientes from "../models/Clientes";



export class ClienteRepository {
    async getById({ id, }) {

        const projecto = await Clientes.findOne({
            where: {
                id,

            },

        });

        return projecto;
    };

    async getByName({ nome, }) {

        const projecto = await Clientes.findOne({
            where: {
                nome,

            },

        });

        return projecto;
    };

    async getAll() {
        const { rows: clientes, count: total } = await Clientes.findAndCountAll();
        return { clientes, total }
    };

    async getAllCustom({ whereClausule }) {
        const { rows: clientes, count: total } = await Clientes.findAndCountAll({ where: whereClausule });
        return { clientes, total }
    };

    async update({
        id,
        data
    }) {
        const projectoExiste = await this.getById({ id });

        if (!projectoExiste) {
            throw new BadRequestError("id projecto invalido")
        }
        projectoExiste.update(data)
        return true
    }

    async create({
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
        usuarioId,
        activo,
    }) {

        const clienteNovo = await Clientes.create({
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
            usuarioId,
            activo
        })
        return clienteNovo
    }
    async count({ whereClause = undefined }) {
        const total =
            await Clientes.count(
                {
                    where: whereClause,
                });
        console.log("TOTAL=>", total);
        return { total }
    };

}

