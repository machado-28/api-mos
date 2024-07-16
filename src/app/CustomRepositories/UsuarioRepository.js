import { ForBiddenError, NotFoundError } from "../helpers/api-errors";
import Usuarios from "../models/Usuarios";
import Painels from "../models/Painels";
import Ficheiros from "../models/Ficheiros";
import { where } from "sequelize";
import builAttributesClause from "../utils/buildAttributesClause";
import builOrderClause from "../utils/buildOrderClause";

export class UsuarioRepository {
    async getById({ id = 0 }) {
        console.log("ID USER", id);
        const usuario = await Usuarios.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Painels,
                    as: "painel"
                },

            ]
        });
        return usuario;
    };

    async getAll() {
        const {
            rows: usuario,
            count: total } = await Usuarios.findAndCountAll();
        return { usuario, total }
    };
    async getAllCustom({ whereClause, orderClause, includeClause, attributes }) {

        const { rows: usuario, count: total } =
            await Usuarios.findAndCountAll(
                {
                    where: whereClause,
                    include: includeClause,
                    order: [builOrderClause(orderClause)],
                    attributes: builAttributesClause(attributes)

                });
        return { usuario, total }
    };
    async count({ whereClause }) {

        const total =
            await Usuarios.count(
                {
                    where: whereClause,
                });
        return { total }
    };

    async getByUsuario({ usuario }) {
        const usuarioExiste = await Usuarios.findOne({
            where: {
                usuario
            }
        })
        return usuarioExiste;
    }
    async getByUsuario({ usuario }) {
        const usuarioExiste = await Usuarios.findOne({
            where: {
                usuario
            }
        })
        return usuarioExiste;
    }

    async update({ id, data }) {
        const usuarioExiste = await this.getById({ id })

        if (!usuarioExiste) throw new NotFoundError("usuario invalido");

        const actualizado = await usuarioExiste.update(data)
        return true
    }

    async delete({ id }) {
        const usuarioExiste = await this.getById({ id })

        if (!usuarioExiste) throw new NotFoundError("usuario invalido");
        await usuarioExiste.destroy();
        return true
    }

    async create({ nome, painelId, usuario, clienteId, senha, avatarId, telefone, email }) {

        const usuarioNovo = await Usuarios.create({ nome, painelId, usuario, clienteId, senha, avatarId, telefone, email })
        return usuarioNovo
    }

}