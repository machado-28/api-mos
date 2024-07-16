import Pedidos from "../../models/Pedidos";
import Fazes from "../../models/Fazes";
import { Op } from "sequelize";
import Ficheiros from "../../models/Ficheiros";
import TipoFicheiros from "../../models/TipoFicheiros";
import { startOfMonth, endOfMonth, getMonth } from "date-fns";
import Requerentes from "../../models/Requerentes";
import TipoVistos from "../../models/TipoVistos";
import StatusDePedidos from "../../models/StatusDePedidos";
import TipoPedidos from "../../models/TipoPedidos";

class ListPedidosController {
    async relatorioMensal(req, res) {
        // Função para calcular a quantidade total de processos em cada mês e suas percentagens
        async function calcularProcessosPorMes(req) {
            const { fazeId, statusId, requerenteId, tipoVistoId, data = new Date() } = req.query;
            const inicioDoMes = startOfMonth(data);
            const fimDoMes = endOfMonth(data);
            const totalGeralDeProcessos = await Pedidos.count(); // Total geral de processos

            // Obter o ano atual e o mês atual
            const anoAtual = new Date().getFullYear();
            const mesAtual = getMonth(data);

            const processosPorMes = [];
            const meses = [];

            // Iterar através de cada mês do ano atual até o mês atual
            for (let mes = 0; mes <= mesAtual; mes++) {
                const mesInicio = new Date(anoAtual, mes, 1);
                const mesFim = endOfMonth(new Date(anoAtual, mes, 1));

                // Contar o número total de processos dentro do mês
                const totalDeProcessosMensal = await Pedidos.count({
                    where: {
                        createdAt: {
                            [Op.between]: [mesInicio, mesFim]
                        }
                    }
                });

                // Calcular a percentagem de processos em relação ao total geral
                const percentagem = (totalDeProcessosMensal / totalGeralDeProcessos) * 100;

                // Adicionar os resultados à lista de processos por mês
                processosPorMes.push({ mes: mesInicio.toLocaleString('default', { month: 'long' }), total: totalDeProcessosMensal, percentagem });
                meses.push(mesInicio.toLocaleString('default', { month: 'long' }));
            }

            return { processosPorMes, meses };
        }

        // Uso da função
        calcularProcessosPorMes(req).then(result => {
            console.log("Processos por Mês:", result.processosPorMes);
            console.log("Meses:", result.meses);
        }).catch(error => {
            console.error("Erro ao calcular processos por mês:", error);
        });

    }
    async relatorio(req, res) {
        const { fazeId, statusId, requerenteId, tipoVistoId, data = new Date() } = req.query;

        const inicioDoMes = startOfMonth(data);
        const fimDoMes = endOfMonth(data);

        const totalDeProcessosMensal = await Pedidos.count({
            where: {
                createdAt: {
                    [Op.between]: [inicioDoMes, fimDoMes]
                }
            }
        })

        if (fazeId) {
            console.log("Entrou", req.query);
            if (statusId && !tipoVistoId) {
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {

                            }
                        }
                    ],
                    where: {
                        fazeActualId: fazeId,
                        statusActualId: statusId,
                        createdAt: {
                            [Op.between]: [inicioDoMes, fimDoMes]
                        }
                    }
                });
                const percentagem = totalDeProcessosMensal / total
                dados = { total }
                return res.status(200).json(dados);
            }
            if (!statusId && tipoVistoId) {
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {

                            }
                        }
                    ],
                    where: {
                        fazeActualId: fazeId,
                        tipoVistoId,
                        createdAt: {
                            [Op.between]: [inicioDoMes, fimDoMes]
                        }
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }

            if (statusId && tipoVistoId) {
                console.log(" terceiRA");
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {

                                where: {

                                }
                            }
                        }
                    ],
                    where: {
                        tipoVistoId,
                        fazeActualId: fazeId,
                        statusActualId: statusId,
                        createdAt: {
                            [Op.between]: [inicioDoMes, fimDoMes]
                        }
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }

            const total = await Pedidos.count({
                include: [
                    {
                        model: Fazes,
                        as: "fazes",
                        through: {

                        }
                    }
                ],
                where: {
                    fazeActualId: fazeId,
                    createdAt: {
                        [Op.between]: [inicioDoMes, fimDoMes]
                    }// Garante que apenas pedidos associados à fase serão retornados
                }
            },)
            dados = { total }
            return res.status(200).json(dados);
        }

        if (!fazeId) {
            if (statusId && !tipoVistoId) {
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {


                            }
                        }
                    ],
                    where: {
                        statusActualId: statusId // Garante que apenas pedidos associados à fase serão retornados
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }
            if (!statusId && tipoVistoId) {
                const total = await Pedidos.count({
                    where: {
                        tipoVistoId // Garante que apenas pedidos associados à fase serão retornados
                    },
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {


                            }
                        }
                    ],

                });
                dados = { total }
                return res.status(200).json(dados);
            }

            if (statusId && tipoVistoId) {
                console.log(" terceiRA");
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {

                            }
                        }
                    ],
                    where: {
                        tipoVistoId,
                        statusActualId: statusId
                        // Garante que apenas pedidos associados à fase serão retornados
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }


        }
        const total = await Pedidos.count({
            include: [
                {
                    model: Fazes,
                    as: "fazes",
                    through: {


                    }
                }
            ],

        });
        dados = { total }
        return res.status(200).json(dados);
    }
    async count(req, res) {
        const { fazeId, statusId, requerenteId, tipoVistoId, } = req.query;
        let dados = {}
        console.log("REQ", req.query);

        if (fazeId) {
            console.log("Entrou", req.query);
            if (statusId && !tipoVistoId) {
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {


                            }
                        }
                    ],
                    where: {
                        fazeActualId: fazeId,
                        statusActualId: statusId,
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }
            if (!statusId && tipoVistoId) {
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {

                            }
                        }
                    ],
                    where: {
                        fazeActualId: fazeId,
                        tipoVistoId
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }

            if (statusId && tipoVistoId) {
                console.log(" terceiRA");
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {

                                where: {

                                }
                            }
                        }
                    ],
                    where: {
                        tipoVistoId,
                        fazeActualId: fazeId,
                        statusActualId: statusId
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }

            const total = await Pedidos.count({
                include: [
                    {
                        model: Fazes,
                        as: "fazes",
                        through: {

                        }
                    }
                ],
                where: {
                    fazeActualId: fazeId // Garante que apenas pedidos associados à fase serão retornados
                }
            },)
            dados = { total }
            return res.status(200).json(dados);
        }

        if (!fazeId) {
            if (statusId && !tipoVistoId) {
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {


                            }
                        }
                    ],
                    where: {
                        statusActualId: statusId // Garante que apenas pedidos associados à fase serão retornados
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }
            if (!statusId && tipoVistoId) {
                const total = await Pedidos.count({
                    where: {
                        tipoVistoId // Garante que apenas pedidos associados à fase serão retornados
                    },
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {


                            }
                        }
                    ],

                });
                dados = { total }
                return res.status(200).json(dados);
            }

            if (statusId && tipoVistoId) {
                console.log(" terceiRA");
                const total = await Pedidos.count({
                    include: [
                        {
                            model: Fazes,
                            as: "fazes",
                            through: {

                            }
                        }
                    ],
                    where: {
                        tipoVistoId,
                        statusActualId: statusId
                        // Garante que apenas pedidos associados à fase serão retornados
                    }
                });
                dados = { total }
                return res.status(200).json(dados);
            }


        }
        const total = await Pedidos.count({
            include: [
                {
                    model: Fazes,
                    as: "fazes",
                    through: {


                    }
                }
            ],

        });
        dados = { total }
        return res.status(200).json(dados);
    }
    async getAll(req, res) {
        const { statusId, tipoId, tipoVistoId, fromSite, fromDate, toDate } = req.query
        const parsedStatusId = statusId === 'null' ? null : statusId;
        const parsedTipoId = tipoId === 'null' ? null : tipoId;
        const parsedTipoVistoId = tipoVistoId === 'null' ? null : tipoVistoId;
        const parsedFromSite = fromSite === 'null' ? null : fromSite;
        const parsedFromDate = fromDate ? new Date(fromDate) : null;
        const parsedToDate = toDate ? new Date(toDate) : null;
        console.log("QUERY ", req.query);
        const whereConditions = {};

        // Adicione condições dinamicamente
        if (parsedStatusId !== null && parsedStatusId !== undefined) {
            whereConditions.statusId = parsedStatusId;
        }
        if (parsedTipoId !== null && parsedTipoId !== undefined) {
            whereConditions.tipoId = parsedTipoId;
        }
        if (parsedTipoVistoId !== null && parsedTipoVistoId !== undefined) {
            whereConditions.tipoVistoId = parsedTipoVistoId;
        }
        if (parsedFromSite !== null && parsedFromSite !== undefined) {
            whereConditions.fromSite = parsedFromSite;
        }
        if (parsedFromDate !== null && parsedToDate !== null) {
            whereConditions.date = {
                [Op.between]: [parsedFromDate, parsedToDate],
            };
        } else if (parsedFromDate !== null) {
            whereConditions.date = {
                [Op.gte]: parsedFromDate,
            };
        } else if (parsedToDate !== null) {
            whereConditions.date = {
                [Op.lte]: parsedToDate,
            };
        }

        const { count: total, rows: pedidos } = await Pedidos.findAndCountAll({
            where: Object.keys(whereConditions).length > 0 ? whereConditions : undefined,
            include: [
                { model: Requerentes, as: "requerente" },
                { model: TipoPedidos, as: "tipo" },
                { model: TipoVistos, as: "tipoVisto" },
                { model: StatusDePedidos, as: "status" },
            ]
        });

        return res.status(200).json({
            pedidos,
            total,
            status: "ok",
            code: 200
        })
    }
    async getOne(req, res) {
        const { numero, passaporte, id } = req.query
        let dados

        console.log(req.query)

        if (id) {
            console.log("PASSOW")
            const pedido = await Pedidos.findOne({
                where: {
                    id,

                },
                include: [
                    {
                        model: Fazes,
                        as: "fazes",
                        through: {

                        }
                    },
                    { model: Requerentes, as: "requerente" },
                    { model: StatusDePedidos, as: "statusActual" },
                    { model: Fazes, as: "fazeActual" },
                    { model: TipoVistos, as: "tipoVisto" },

                    {
                        model: Ficheiros,
                        as: "anexo",
                        include: [
                            {
                                model: TipoFicheiros,
                                as: "tipo"
                            }
                        ]
                    },


                ],

            })
            dados = pedido
            return res.status(200).json(dados)


        }

        if (numero) {
            const pedido = await Pedidos.findOne({
                where: {
                    numero

                },
                include: [
                    {
                        model: Fazes,
                        as: "fazes",
                        through: {

                        }
                    },
                    { model: Requerentes, as: "requerente" },
                    { model: StatusDePedidos, as: "statusActual" },
                    { model: Fazes, as: "fazeActual" },
                    { model: TipoVistos, as: "tipoVisto" },
                    {
                        model: Documentos,
                        as: "documentos",
                        include: [
                            {
                                model: Ficheiros,
                                as: "anexo"
                            },
                            {
                                model: TipoFicheiros,
                                as: "tipo"
                            }
                        ]
                    }
                ],

            })
            dados = pedido
            return res.status(200).json(dados)
        }

        if (passaporte) {
            const pedido = await Pedidos.findOne({
                include: [
                    {
                        model: Fazes,
                        as: "fazes",
                        through: {
                        }
                    },
                    {
                        association: "Documentos",

                        where: {
                            tipoId: 1

                        },
                        include: [
                            {
                                model: Ficheiros,
                                as: "anexo"
                            },
                            {
                                model: TipoFicheiros,
                                as: "tipo"
                            }
                        ]
                    }
                ],

            })
            3/**--=[] */
        }
    }


}

export default new ListPedidosController();