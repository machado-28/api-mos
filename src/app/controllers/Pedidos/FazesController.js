import Fazes from "../../models/Fazes";
import StatusDePedidos from "../../models/StatusDePedidos";

class FazesController {

    async getAll(req, res) {
        const { procesoId } = req.params;
        const fazes = await Fazes.findAll();
        return res.status(200).json({ fazes });
    }

    async getStaus(req, res) {
        const { fazeId } = req.params;
        let dados
        const fazes = await Fazes.findAll({
            include: {
                model: StatusDePedidos,
                as: "status",
                through: {

                }
            },
            where: {
                "$fazeId$": fazeId
            }
        });
        dados = fazes

        return res.status(200).json(dados)
    }
}

export default new FazesController()