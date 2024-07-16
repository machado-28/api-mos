
import { BadRequestError } from "../helpers/api-errors";
import Painel from "../models/Painels";

export class PainelRepository {
    async getById({ id }) {

        const painel = await Painel.findOne({
            where: {
                id
            },

        });
        return painel;
    };
    async getAllCustom({ whereClausule }) {
        const { rows: painels, count: total } = await Painel.findAndCountAll({ where: whereClausule });
        return { painels, total }
    };
    async getAll() {
        const { rows: painel, count: total } = await Painel.findAndCountAll();
        return { painel, total }
    };
}