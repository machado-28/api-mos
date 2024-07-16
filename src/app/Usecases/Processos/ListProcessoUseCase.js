import { ProcessoRepository } from "../../CustomRepositories/ProcessoRepository";
import { RequerenteRepository } from "../../CustomRepositories/RequerenteRepository";
import { TipoVistoRepository } from "../../CustomRepositories/TipoVistoRepository";
import { NotFoundError } from "../../helpers/api-errors";
import { StatatusProcessoRepository } from "../../CustomRepositories/StatatusProcessoRepository";
import { FazeRepository } from "../../CustomRepositories/FazeRepository";

class ListProcessoUseCase {

    async getAll({ requerenteId, statusId, tipoVistoId, fazeId }) {

        const processoRepository = new ProcessoRepository();
        const statatusProcessoRepository = new StatatusProcessoRepository();
        const tipoVistoRepository = new TipoVistoRepository();
        const requerenteRepository = new RequerenteRepository();
        const FazeRepository = new FazeRepository();
        const requerenteExiste = requerenteRepository.getById(requerenteId);

        if (!requerenteExiste) {
            throw NotFoundError("Requerente nao encontrado!");
        }

        if (!requerenteId && !statusId && !tipoVistoId && !fazeId) {
            const data = await processoRepository.getAll();

            return data
        }

        const statatusExiste = statatusProcessoRepository.getById(statusId);
        if (!statatusExiste) {
            throw NotFoundError("Status de processo  nao encontrado!");
        }

        const fazeExiste = FazeRepository.getById(statusId);
        if (!fazeExiste) {
            throw NotFoundError("Faze de processo nao encontrado!");
        }

        const tipoVistoExiste = tipoVistoRepository.getById(statusId);
        if (!tipoVistoExiste) {
            throw NotFoundError("Tipo de Visto nao encontrado!");
        }

        const data = await processoRepository.getAllAllByFazeAndStatusAndTipoVisto({ requerenteId, statusId, tipoVistoId, fazeId });

        return data

    }
}
export default new ListProcessoUseCase()