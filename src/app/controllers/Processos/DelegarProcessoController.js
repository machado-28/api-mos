import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";
import { ProcessoRepository } from "../../CustomRepositories/ProcessoRepository";
import Processos from "../../models/Processos";
import Fazes from "../../models/Fazes";
import Steps from "../../models/Steps";
import Usuarios from "../../models/Usuarios";
import StatusDeSteps from "../../models/StatusDeSteps";
import ProcessoFases from "../../models/ProcessoFases";

class DelegarProcessoController {
    async execute(req, res) {
        const schema = yup.object().shape({
            responsavelId: yup.date().required(),
            prazo: yup.string().required(),
            statusId: yup.string().required(),
            stepId: yup.string().required(),

        });

        let inputValidation = true;
        try {
            await schema.validate(req.body);
        } catch (err) {
            console.error(req.body);
            inputValidation = false;
            const erro = err.errors[0];
            throw new BadRequestError(erro);
        }

        const { stepId, responsavelId, prazo } = req.body;
        const { id: processoId } = req.params;

        const processoRepository = new ProcessoRepository()
        const processo = await processoRepository.getById({ id: processoId });

        if (!processo) {
            throw new NotFoundError("Processo não encontrado");
        }

        const fase = await Steps.findByPk(stepId);
        if (!fase) {
            throw NotFoundError("Fase não encontrada");
        }

        const responsavel = await Usuarios.findByPk(responsavelId);
        if (!responsavel) {
            throw new NotFoundError('usuario não encontrado ou inválido');
        }


        const status = await StatusDeSteps.findOne({ where: { nome: 'pendente' } });
        if (!status) {
            throw new NotFoundError('Status "em andamento" não encontrado');
        }

        const processofase = await ProcessoFases.create({
            processoId,
            stepId,
            prazo,
            responsavelId,
            statusId: status?.id,
            dataInicio: new Date(),
        })

        const statusEmAndamento = await StatusDeSteps.findOne({ where: { nome: 'em andamento' } });
        if (processo.statusId === status.id) {
            processo.statusId = statusEmAndamento?.id;
            await processo.save();
        }
        return res.status(201).json({
            message: `Fase delegada com sucesso`,
            status: "ok",
            statusCode: 201,
            processofase
        })

    }
}
export default new DelegarProcessoController();