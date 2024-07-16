import { ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Tecnicos from "../models/Tecnicos";
import Painels from "../models/Painels";
import Ficheiros from "../models/Ficheiros";
import { where } from "sequelize";
import builAttributesClause from "../utils/buildAttributesClause";
import builOrderClause from "../utils/buildOrderClause";

export class TecnicoRepository {
    async getById({ id }) {
        console.log("ID USER", id);
        const tecnico = await Tecnicos.findOne({
            where: {
                id,
            },
        });
        return tecnico;
    };

    async getAll() {
        const {
            rows: tecnicos,
            count: total } = await Tecnicos.findAndCountAll();
        return { tecnicos, total }
    };
    async getAllCustom({ whereClause, orderClause, includeClause, attributes }) {

        const { rows: tecnicos, count: total } =
            await Tecnicos.findAndCountAll(
                {
                    where: whereClause,
                    include: includeClause,
                    order: [builOrderClause(orderClause)],
                    attributes: builAttributesClause(attributes)

                });
        return { tecnicos, total }
    };
    async count({ whereClause }) {

        const total =
            await Tecnicos.count(
                {
                    where: whereClause,
                });
        return { total }
    };



    async update({ id, data }) {
        const tecnicoExiste = await this.getById({ id })

        if (!tecnicoExiste) throw new NotFoundError("tecnico invalido");

        const actualizado = await tecnicoExiste.update(data)
        return true
    }

    async delete({ id }) {
        const tecnicoExiste = await this.getById({ id })

        if (!tecnicoExiste) throw new NotFoundError("tecnico invalido");
        await tecnicoExiste.destroy();
        return true
    }

    async create({ nome, painelId, tecnico, clienteId, senha, avatarId, telefone, email }) {

        const tecnicoNovo = await Tecnicos.create({ nome, painelId, tecnico, clienteId, senha, avatarId, telefone, email })
        return tecnicoNovo
    }

}