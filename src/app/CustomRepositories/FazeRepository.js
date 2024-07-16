
import Fazes from "../models/Fazes";
export class FazeRepository {
    async create({
        pedidoId,
        nome,
        status,
        descricao
    }) {


        const faze = await Fazes.create({
            pedidoId,
            nome,
            status,
            descricao
        });

        return faze
    }

    async getAll({}) {

    }

}