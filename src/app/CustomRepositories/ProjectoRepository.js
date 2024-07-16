import { BadRequestError, ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Projectos from "../models/Projectos";
import Painels from "../models/Painels";
import Ficheiros from "../models/Ficheiros";
import builOrderClause from "../utils/buildOrderClause";
import builAttributesClause from "../utils/buildAttributesClause";
import buildWhereClause from "../utils/buildWhereClause";
import buildIncludeClause from "../utils/buildIncludeClause";


export class ProjectoRepository {
    async getById({ id, }) {

        const projecto = await Projectos.findOne({
            where: {
                id,

            },

        });
        console.log("projecto", projecto);
        return projecto;
    }
    async delete({ id }) {

        const projecto = await Projectos.findOne({
            where: {
                id,

            },

        });
        if (!projecto) {
            throw new NotFoundError("projecto nao encontrado");
        }
        console.log("projecto", projecto);
        await projecto.destroy(id)
        return true;
    };
    async getByName({ nome, clienteId }) {
        console.log("cOME", nome);
        const projecto = await Projectos.findOne({
            where: {
                nome,
                clienteId
            },

        });
        console.log("projecto", projecto);
        return projecto;
    };

    async getAll() {
        const { rows: projectos, count: total } = await Projectos.findAndCountAll();
        return { projectos, total }
    };

    async count({ whereClause }) {
        const total =
            await Projectos.count(
                {
                    where: whereClause,
                });
        console.log("TOTAL=>", total);
        return { total }
    };


    async getAllCustom({ whereClause, orderClause, includeClause, attributesClause, attributes }) {
        const { rows: projectos, count: total } = await Projectos.findAndCountAll({
            where: buildWhereClause(whereClause),
            include: buildIncludeClause(includeClause),
            order: [builOrderClause(orderClause)],
            attributes: builAttributesClause(attributes)

        });
        return { projectos, total }
    };

    async update({
        id,
        data
    }) {
        const projectoExiste = await this.getById({ id });

        if (!projectoExiste) {
            throw new BadRequestError("id projecto invalido")
        }
        await projectoExiste.update(data)
        return true
    }

    async create({
        nome, clienteId, gestorExternoId, gestorInternoId
    }) {

        const projectoNovo = await Projectos.create({
            nome, clienteId, gestorExternoId, gestorInternoId,
        })
        return projectoNovo
    }

}