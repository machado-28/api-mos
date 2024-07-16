import Vistos from "../models/Vistos";
import { star } from "date-fns"
import { Op } from "sequelize"
import { NotFoundError, UnAuthoriazedError } from "../helpers/api-errors";
import Ficheiros from "../models/Ficheiros";
import Pedidos from "../models/Pedidos";
import Requerentes from "../models/Requerentes";
import TipoVistos from "../models/TipoVistos";
import StatusDeVistos from "../models/StatusDeVistos";

class VistoRepository {

    async create({
        numero,
        tipoId,
        processoId,
        dataValidade,
        dataEmissao,
        anexoId
    }) {

        const vistoJaEmitido = await this.validadeByNumero({ numero });
        if (vistoJaEmitido) {
            throw new UnAuthoriazedError("Este Visto Ja foi Emitido")
        }

        const visto = await Vistos.create({
            numero,
            tipoId,
            processoId, dataValidade,
            anexoId,
            dataEmissao,
            dataValidade
        });

        return true
    }
    async update({ numero,
        dataValidade,
        anexoId,
        dataEmissao,

    }) {
        const isValid = await this.validadeByNumero({ numero })
        if (!isValid) {
            throw new NotFoundError("Visto invalido")
        }
        const visto = await this.getByNumero({ numero });
        await visto.update({ dataValidade, dataEmissao, anexoId, });

        return true
    }

    async getAll() {
        const { count: total, rows: vistos } = await Vistos.findAndCountAll({
            include: [
                {
                    model: Ficheiros,
                    as: "anexo"
                },
                {
                    model: StatusDeVistos,
                    as: "statusActual"
                },
                {
                    model: Pedidos,
                    as: "processo",
                    include: [
                        {
                            model: Requerentes,
                            as: "requerente"
                        },
                        {
                            model: TipoVistos,
                            as: "tipoVisto"
                        }
                    ]
                }
            ]

        });
        return {
            total, vistos
        }
    }
    async validadeByNumero({ numero }) {
        let isValid = await Vistos.findOne({
            where: {
                numero,
            },

        });
        if (!isValid) {
            return false
        }
        return true
    }

    async validadeById({ id }) {
        let isValid = await Vistos.findOne({
            where: {
                id,
            },

        });
        if (!isValid) {
            return false
        }
        return true
    }
    async getByNumero({ numero }) {
        const isValid = this.validadeByNumero({ numero })
        if (!isValid) {
            return false
        }

        const visto = await Vistos.findOne({
            where: { numero },
            include: [
                {
                    model: Ficheiros,
                    as: "anexo"
                },
                {
                    model: Pedidos,
                    as: "processo",
                    include: [
                        {
                            model: Requerentes,
                            as: "requerente"
                        },
                        {
                            model: TipoVistos,
                            as: "tipoVisto"
                        }
                    ]
                }
            ]
        })

        return visto
    }
    async getAllValiableDate() {
        const dataActual = new Date()

        const { count: total, rows: vistos } = await Vistos.findAndCountAll({
            where: {
                dataValidade: {
                    [Op.gt]: dataActual
                }
            },
            include: [
                {
                    model: Ficheiros,
                    as: "anexo"
                },
                {
                    model: Pedidos,
                    as: "processo",
                    include: [
                        {
                            model: Requerentes,
                            as: "requerente"
                        },
                        {
                            model: TipoVistos,
                            as: "tipoVisto"
                        }
                    ]
                }
            ]
        })

        return { total, vistos }
    }
    async validateIfDateIsExpired({ numero }) {
        const isValid = await this.validadeByNumero({ numero })

        if (!isValid) {
            throw new NotFoundError("Numero de Visto Invalido")
        }

        const dataActual = new Date();
        const expired = await Vistos.findOne({
            where: {
                dataValidade: {
                    [Op.lte]: dataActual
                }
            },

        });
        if (!expired) {
            return false
        }

        return true
    }
    async getById({ id }) {
        const isValid = this.validadeByNumero({ id })
        if (!isValid) {
            return false
        }

        const visto = await Vistos.findOne({
            where: { id },
            include: [
                {
                    model: Ficheiros,
                    as: "anexo"
                },
                {
                    model: Pedidos,
                    as: "processo",
                    include: [
                        {
                            model: Requerentes,
                            as: "requerente"
                        },
                        {
                            model: TipoVistos,
                            as: "tipoVisto"
                        }
                    ]
                }
            ]
        })
        return visto
    }

    async getAllUnvaliableDate() {
        const dataActual = new Date()

        const { count: total, rows: vistos } = await Vistos.findAndCountAll({
            where: {
                dataValidade: {
                    [Op.lte]: dataActual
                }
            },
            include: [
                {
                    model: Ficheiros,
                    as: "anexo"
                },
                {
                    model: Pedidos,
                    as: "processo",
                    include: [
                        {
                            model: Requerentes,
                            as: "requerente"
                        },
                        {
                            model: TipoVistos,
                            as: "tipoVisto"
                        }
                    ]
                }
            ]
        })

        return { total, vistos }
    }
}
export default VistoRepository;