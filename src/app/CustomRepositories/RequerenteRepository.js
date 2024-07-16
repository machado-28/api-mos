import { ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Requerentes from "../models/Requerentes";
import Painels from "../models/Painels";
import Ficheiros from "../models/Ficheiros";
 


export class RequerenteRepository {
    async getById({ id }) {
        console.log("cOME", id);
        const requerente = await Requerentes.findOne({
            where: {
                id,
            },
            include: [
                {
                    association: "Ficheiros",
                },

            ]
        });
       
        return requerente;
    };

    async getAll() {
        const { rows: clientes, count: total } = await Requerentes.findAndCountAll();
        return { clientes, total }
    };
    async getByPassaporte({ passaporte }) {
        const cliente = await Requerentes.findOne({
            where: {
                passaporte
            }
        });
        return cliente
    };



    async update({
        id,
        nome,
        dataNascimento,
        genero,
        estadoCivil,
        sindicato,
        nacionalidade,
        nomePai,
        nacionalidadePai,
        nomeMae,
        nacionalidadeMae,
        enderecoAngola,
        passaporte,
        passaporteDataValidade,
        passaporteDataEmissao,
        passaporteLocalEmissao,
        telefone,
        email,
        senha,
        profissao,
        funcao,
        nomeEmpresa,
        emailEmpresa,
        telefoneEmpresa,
        enderecoEmpresa }) {
        const clienteExiste = await this.getByName(id)

        if (!clienteExiste) throw new NotFoundError("cliente id invalido");

        const actualizado = await clienteExiste.update({
            nome,
            dataNascimento,
            genero,
            estadoCivil,
            sindicato,
            nacionalidade,
            nomePai,
            nacionalidadePai,
            nomeMae,
            nacionalidadeMae,
            enderecoAngola,
            passaporte,
            passaporteDataValidade,
            passaporteDataEmissao,
            passaporteLocalEmissao,
            telefone,
            email,
            senha,
            profissao,
            funcao,
            nomeEmpresa,
            emailEmpresa,
            telefoneEmpresa,
            enderecoEmpresa
        })
        return true
    }

    async create({
        nome,
        dataNascimento,
        genero,
        estadoCivil,
        sindicato,
        nacionalidade,
        nomePai,
        nacionalidadePai,
        nomeMae,
        nacionalidadeMae,
        enderecoAngola,
        passaporte,
        passaporteDataValidade,
        passaporteDataEmissao,
        passaporteLocalEmissao,
        telefone,
        email,
        senha,
        profissao,
        funcao,
        nomeEmpresa,
        emailEmpresa,
        telefoneEmpresa,
        enderecoEmpresa }) {

        const requerenteNovo = await Requerentes.create({
            nome,
            dataNascimento,
            genero,
            estadoCivil,
            sindicato,
            nacionalidade,
            nomePai,
            nacionalidadePai,
            nomeMae,
            nacionalidadeMae,
            enderecoAngola,
            passaporte,
            passaporteDataValidade,
            passaporteDataEmissao,
            passaporteLocalEmissao,
            telefone,
            email,
            senha,
            profissao,
            funcao,
            nomeEmpresa,
            emailEmpresa,
            telefoneEmpresa,
            enderecoEmpresa
        })
        return requerenteNovo
    }

}