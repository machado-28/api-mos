import VistoRepository from "../../CustomRepositories/VistoRepository";
import EmitVistoUseCase from "../../Usecases/Visto/EmitVistoUseCase"

class VistoController {
    async create(req, res) {
        const { numero, tipoId, dataValidade, dataEmissao, anexoId, processoId } = req.body
        await EmitVistoUseCase.execute({
            numero,
            tipoId,
            dataValidade,
            dataEmissao,
            anexoId,
            processoId
        });

        return res.status(201).json({
            message: "Visto emitido Com Sucesso",
            status: 201
        })

    }

    async getAll(req, res) {
        const vistoRepository = new VistoRepository();
        const { total, vistos } = await vistoRepository.getAll();
        return res.status(200).json({ total, vistos })
    }

    async getAllExpired(req, res) {
        const vistoRepository = new VistoRepository();
        const { total, vistos } = await vistoRepository.getAllUnvaliableDate();
        return res.status(200).json({ total, vistos })
    }
    async getAllActived(req, res) {
        const vistoRepository = new VistoRepository();
        const { total, vistos } = await vistoRepository.getAllValiableDate();
        return res.status(200).json({ total, vistos })
    }

    async getOne(req, res) {
        const vistoRepository = new VistoRepository();
        const { id } = req.params
        const visto = await vistoRepository.getById({ id });
        return res.status(200).json({ visto })
    }
}
export default new VistoController()