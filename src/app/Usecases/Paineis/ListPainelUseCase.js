import { Op } from "sequelize";
import { PainelRepository } from "../../CustomRepositories/Painel";

class ListPainelUsecase {

    async execute({ usuarioLogado }) {
        const painel = "ADMINISTRADOR GERAL".toLocaleUpperCase()
        let paineis
        const painelRepository = new PainelRepository();

        if (usuarioLogado?.painel?.nome?.toLocaleUpperCase() !== painel) {
            paineis = await painelRepository.getAllCustom({
                whereClausule: {
                    nome: [Op.ne] = painel
                }
            });
        }
        else {
            paineis = await painelRepository.getAll();
        }
        return paineis;
    }
}

export default new ListPainelUsecase();