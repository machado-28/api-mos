import { ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Usuarios from "../models/Usuarios";
import Painels from "../models/Painels";
import Ficheiros from "../models/Ficheiros";
import Requerentes from "../models/Requerentes";

export class RequerenteRepository {
    async getById(id) {
        const usuario = await Usuarios.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Painels,
                    as: "painel"
                },
                {
                    model: Ficheiros,
                    as: "avatar"
                }
            ]
        });
        return usuario;
    };

    async getAll() {
        const { rows: usuario, count: total } = await Usuarios.findAndCountAll();
        return { usuario, total }
    };



    async update({ nome, painel, usuario, avatarId }) {
        const usuarioExiste = await this.getByName(nome)

        if (!usuarioExiste) throw new NotFoundError("usuario invalido");

        const actualizado = await usuarioExiste.update({ nome, painel, usuario, avatarId })
        return actualizado
    }

    async create({
        nome,
        dataNascimento,
        genero,
        estadoCivil,
        localNascimento,
        filiacao,
        contactos,
        moradaAngola,
        sindicato,
        projecto }) {

        const requerenteNovo = await Requerentes.create({
            nome,
            genero,
            estadoCivil,
            paisNascimento: localNascimento?.pais,
            municipioNascimento: localNascimento?.municipio,
            bairroNascimento: localNascimento?.bairro,
            provinciaAngola: moradaAngola?.provincia,
            municipioAngola: moradaAngola?.municipio,
            bairroAngola: moradaAngola?.bairro,
            projecto,
            dataNascimento,
            nomeMae: filiacao?.mae,
            nomePai: filiacao?.pai,
            sindicato,
            telefone: contactos?.telefone,
            email: contactos?.email,
        })
        return requerenteNovo
    }

}