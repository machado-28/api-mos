import { RequerenteRepository } from "../../CustomRepositories/RequerenteRepository";
import { ProcessoRepository } from "../../CustomRepositories/PedidoRepository";

import { ForBiddenError } from "../../helpers/api-errors";

class CreateRequerenteUsecase {

    async execute({
        nome,
        dataNascimento,
        genero, 
        estadoCivil,
        nascimento,
        filiacao,
        contactos,
        moradaAngola,
        sindicato,
        projecto }) {

        const requerenteRepository = new RequerenteRepository()
       
             const novoRequerente = await requerenteRepository.create({
            
            nome,
            dataNascimento,
            genero, estadoCivil,
            nascimento,
            filiacao,
            contactos,
            moradaAngola,
            sindicato,
            projecto
        });
        return novoRequerente

    }
}
export default new CreateRequerenteUsecase()