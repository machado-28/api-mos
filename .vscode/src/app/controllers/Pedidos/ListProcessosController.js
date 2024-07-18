
import * as yup from "yup";
import ListProcessoUseCase from "../../Usecases/Processo/ListProcessoUseCase";


class ListProcessosController {
    async execute(req, res) {

        const { statusId, requerenteId, fazeId, tipoVistoId, } = req.query;
        console.log("status", statusId);

        const { processos, total } = await ListProcessoUseCase.execute({ statusId, requerenteId, fazeId, tipoVistoId, })

        return res.status(200).json({ processos, total });

    }
}

export default new ListProcessosByStatusController();