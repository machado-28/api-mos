
import { ClienteRepository } from "../../CustomRepositories/ClienteRepository";
import { ProcessoRepository } from "../../CustomRepositories/ProcessoRepository";
import { ProjectoRepository } from "../../CustomRepositories/ProjectoRepository";
import { TecnicoRepository } from "../../CustomRepositories/TecnicoRepository";
import { TipoDePedidoRepository } from "../../CustomRepositories/TipoDePedidoRepository";
import { TipoDeVistoRepository } from "../../CustomRepositories/TipoDeVistoRepository";
import { NotFoundError } from "../../helpers/api-errors";
import ProgressoProcessos from "../../models/ProgressoProcessos";

const pendente = 1

class CreateProcessoUsecase {
    async execute({
        funcionarioId,
        dataNascimento,
        genero,
        estadoCivil,
        nacionalidade,
        nomePai,
        nomeMae,
        maeNacionalidade,
        paiNacionalidade,
        vistoId,
        cidadeEndereco,
        passaporteNumero,
        passaporteEmissora,
        passaporteDataValidade,
        passaporteDataEmissao,
        mob,
        dataValidade,
        tipoVistoId,
        tipoId,
        projectoId,
        dataEmissao,
        sindicato,
        funcao,
        clienteId,
        beneficiarioId,
        paisNascimento,

    }) {

        const processoRepository = new ProcessoRepository();
        const tecnicoRepository = new TecnicoRepository();
        const tipoVistoRepository = new TipoDeVistoRepository();
        const clienteRepository = new ClienteRepository();
        const projectoRepository = new ProjectoRepository();
        const tipoPedidoRepository = new TipoDePedidoRepository();

        console.log("EXECUTE DATA", {
            dataNascimento,
            genero,
            estadoCivil,
            nacionalidade,
            nomePai,
            nomeMae,
            maeNacionalidade,
            paiNacionalidade,
            vistoId,
            cidadeEndereco,
            passaporteNumero,
            passaporteEmissora,
            passaporteDataValidade,
            passaporteDataEmissao,
            mob,
            dataValidade,
            tipoVistoId,
            tipoId,
            projectoId,
            dataEmissao,
            sindicato,
            funcao,
            clienteId,
            beneficiarioId,
            paisNascimento,
        });

        const clienteExist = await clienteRepository.getById({ id: clienteId });
        const beneficiarioIdExist = await tecnicoRepository.getById({ id: beneficiarioId, })
        const tipoVistoExist = await tipoVistoRepository.getById({ id: tipoVistoId })
        const tipoPedidoExist = await tipoPedidoRepository.getById({ id: tipoId })
        const projectoIdExist = await projectoRepository.getById({ id: projectoId })


        if (!clienteExist) {
            throw new NotFoundError("Id Cliente não foi encontrado!");
        }
        if (!beneficiarioIdExist) {
            throw new NotFoundError("Id tecnico  não foi encontrado!");
        }

        if (!tipoVistoExist) {
            throw new NotFoundError("Id tipo de visto  não foi encontrado!");
        }
        if (!projectoIdExist) {
            throw new NotFoundError("Id projecto  não foi encontrado!");
        }
        if (!tipoPedidoExist) {
            throw new NotFoundError("Id tipo pedido  não foi encontrado!");
        }

        const novoProcesso = await processoRepository.create({

            dataNascimento,
            genero,
            estadoCivil,
            nacionalidade,
            nomePai,
            nomeMae,
            maeNacionalidade,
            paiNacionalidade,
            vistoId,
            cidadeEndereco,
            passaporteNumero,
            passaporteEmissora,
            passaporteDataValidade,
            passaporteDataEmissao,
            mob,
            dataValidade,
            tipoVistoId,
            tipoId,
            projectoId,
            dataEmissao,
            sindicato,
            funcao,
            clienteId,
            beneficiarioId,
            paisNascimento,
        });
        const { id } = novoProcesso;

        await ProgressoProcessos.create({
            processoId: id,
            statusId: 1,
            stepId: 1,
            funcionarioId,
            concluido_reponsavel: false,
        })
        return novoProcesso

    }
}
export default new CreateProcessoUsecase()