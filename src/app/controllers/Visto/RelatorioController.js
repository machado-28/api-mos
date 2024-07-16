import VistoRepository from "./../../CustomRepositories/VistoRepository"
class RelatorioController {

    async relatorio(req, res) {
        const filtro = req.query
        const { tipoId } = req.params

        switch (filtro) {
            case "diario":
                async () => {
                    const vistoRepository = new VistoRepository()
                    const vistos = await vistoRepository.getAllByDay({ tipoId });
                }
                break;
            case "semanal":
                break;

            case "mensal":
                break;
            default:
                break;
        }
    }
    async gerarPdf(req, res) {


    }
} export default new RelatorioController()