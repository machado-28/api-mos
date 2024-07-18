 
import * as yup from "yup";
import { ProcessosRepository, statusProcessoIds } from "../../CustomRepositories/ProcessosReposoitory";
import { BadRequestError, NotFoundError } from "../../helpers/api-errors";

class UpdadteProcessosStatusController {
    async execute(req, res) {

        const schema = yup.object().shape({
            statusId: yup.string().required(),
            processoId: yup.string().required(),
        });

        try {
            await schema.validate(req.body);
        } catch (err) {
            console.error(req.body);

            const erro = err.errors[0];
            throw new BadRequestError(erro);
        }
        const { processoId, statusId } = req.body;
        console.log("status & processo", statusId, processoId);

        // await UpdateStatusProcessoUsecase.execute({ processostatusId }).catch((erro) => {
        //     throw new BadRequestError(erro); // L
        // });

        const processosRepository = new ProcessosRepository();
        const processoEncontrado = await processosRepository.getById(processoId)

        if (Number(statusId) === Number(statusProcessoIds?.aprovadoMirempetEm)) {
            await processoEncontrado.update({ aprovadoMirempetEm: new Date(), statusId });
            return res.status(200).json({ message: "Operação Realizada com sucesso" });
        }

        if (statusId === statusProcessoIds.aprovadoSMEEm) {
            await processoEncontrado.update({ aprovadoSMEEm: new Date(), statusId });
            return res.status(200).json({ message: "Operação Realizada com sucesso" });
        }

        if (statusId === statusProcessoIds.recusadoSMEEm) {
            await processoEncontrado.update({ recusadoSMEEm: new Date(), statusId })
            return res.status(200).json({ message: "Operação Realizada com sucesso" });
        }

        if (statusId === statusProcessoIds.canceladoEm) {
            await processoEncontrado.update({ canceladoEm: new Date(), statusId })
            return res.status(200).json({ message: "Operação Realizada com sucesso" });
        }

        if (statusId === statusProcessoIds.legalizadoEm) {
            await processoEncontrado.update({ legalizadoEm: new Date(), statusId })
            return res.status(200).json({ message: "Operação Realizada com sucesso" });
        }

        if (statusId === statusProcessoIds.recusadoSMEEm) {
            await processoEncontrado.update({ recusadoSMEEm: new Date(), statusId });
            return res.status(200).json({ message: "Operação Realizada com sucesso" });

        }

        if (statusId === statusProcessoIds.subemtidoMirempetEm) {
            await processoEncontrado.update({ subemtidoMirempetEm: new Date(), statusId })
            return res.status(200).json({ message: "Operação Realizada com sucesso" });
        }

        if (statusId === statusProcessoIds.subemtidoSMEEm) {
            await processoEncontrado.update({ subemtidoSMEEm: new Date(), statusId });
            return res.status(200).json({ message: "Operação Realizada com sucesso" });

        }

        if (statusId === statusProcessoIds.transitadoEm) {
            await processoEncontrado.update({ transitadoEm: new Date(), statusId });
            return res.status(200).json({ message: "Operação Realizada com sucesso" });

        }
        
    throw new  NotFoundError("Algo deu errado!")
        }
    }

export default new UpdadteProcessosStatusController();