import { ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Usuarios from "../models/Usuarios";
import Painels from "../models/Painels";
import Ficheiros from "../models/Ficheiros";

export class UsuarioRepository {
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

    async getByUsuario({ usuario }) {
        const usuarioExiste = await Usuarios.findOne({
            where: {
                usuario
            }
        })
        return usuarioExiste;
    }

    async update({ nome, painel, usuario, avatarId }) {
        const usuarioExiste = await this.getByName(nome)

        if (!usuarioExiste) throw new NotFoundError("usuario invalido");

        const actualizado = await usuarioExiste.update({ nome, painel, usuario, avatarId })
        return actualizado
    }

    async create({ nome, painelId, usuario, senha, avatarId }) {
        const usuarioExiste = await this.getByUsuario({ usuario })

        if (usuarioExiste) throw new ForBiddenError("usuario invalido");

        const usuarioNovo = await usuarioExiste.update({ nome, painelId, usuario, senha, avatarId })
        return usuarioNovo
    }

}