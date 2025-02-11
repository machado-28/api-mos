import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError } from "../../helpers/api-errors";
import { ProcessoRepository } from "../../CustomRepositories/ProcessoRepository";
import Tecnicos from "../../models/Tecnicos";
import Clientes from "../../models/Clientes";
import Projectos from "../../models/Projectos";
import CreateProcessoUseCase from "../../Usecases/Processos/CreateProcessoUseCase";
import Progressos from "../../models/ProgressoProcessos";
import Usuarios from "../../models/Usuarios";
import Processos from "../../models/Processos";
import Steps from "../../models/Steps";
import StatusDeSteps from "../../models/StatusDeSteps";
import ProgressoProcessos from "../../models/ProgressoProcessos";
import StepResponsavel from "../../models/StepResponsavel";
import Painels from "../../models/Painels";
import { where } from "sequelize";
import buildWhereClause from "../../utils/buildWhereClause";
import TipoVistos from "../../models/TipoVistos";
import GerarPDF from "../PDF/GerarPDF";
import PDFGenerator from "../PDF/PDFGenerator";
import path from "path";
import QRCode from 'qrcode'
import Ficheiros from "../../models/Ficheiros";
import UpdateProcessoUseCase from "../../Usecases/Processos/UpdateProcessoUseCase";

class ProcessoController {
    async store(req, res) {
        const schema = yup.object().shape({

            dataNascimento: yup.date().required(),
            genero: yup.string().required(),
            estadoCivil: yup.string().required(),
            nacionalidade: yup.string().required(),
            sindicato: yup.string().required(),
            mob: yup.date(),
            // nascimento: yup.object({
            //     pais: yup.string().required(),
            //     provincia: yup.string().required(),
            //     municipio: yup.string().required(),
            //     bairro: yup.string().required(),
            // }).required(),
            filiacao: yup.object({
                mae: yup.string().required(),
                pai: yup.string().required(),
            }).required(),
            passaporte: yup.object({
                numero: yup.string().required(),
                dataEmissao: yup.string().required(),
                dataValidade: yup.string().required(),
                emissora: yup.string().required(),
            }).required(),
            tipoVistoId: yup.number().required(),
            vistoId: yup.number(),
            projectoId: yup.number().required(),
            clienteId: yup.number().required(),
            beneficiarioId: yup.number().required(),
            tipoId: yup.number().required(),

            enderecoAngola: yup.object({
                provincia: yup.string().required(),
                cidade: yup.string().required(),
            }).required()
        });

        let inputValidation = true;


        try {
            await schema.validate(req.body);
        } catch (err) {
            console.error(req.body);
            inputValidation = false;
            const erro = err.errors[0];
            throw new BadRequestError(erro);
        }

        const {
            funcao,
            dataNascimento,
            genero,
            mob,
            estadoCivil,
            nacionalidade,
            filiacao,
            tipoId,
            tipoVistoId,
            vistoId,
            passaporte,
            projectoId,
            sindicato,
            clienteId,
            beneficiarioId,
            paisNascimento,
            enderecoAngola,
        } = req.body

        console.log("BODY REQUEST", req.body);


        const processoRepository = new ProcessoRepository();

        console.log("BEFORE EXECUTE", {
            dataNascimento,
            genero,
            funcao,
            tipoId,
            estadoCivil,
            nacionalidade,
            nomePai: filiacao?.mae,
            nomeMae: filiacao?.mae,
            maeNacionalidade: filiacao?.maeNacionalidade,
            paiNacionalidade: filiacao?.paiNacionalidade,
            vistoId: filiacao?.vistoId,
            mob,
            projectoId,
            sindicato,
            passaporteDataValidade: passaporte?.dataValidade,
            passaporteDataEmissao: passaporte?.dataEmissao,
            passaporteEmissora: passaporte?.emissora,
            passaporteNumero: passaporte?.numero,
            sindicato: filiacao?.sindicato,
            clienteId,
            beneficiarioId,
            funcao: filiacao?.funcao,
            paisNascimento,
            tipoVistoId,
        });
        const processo = await CreateProcessoUseCase.execute({

            dataNascimento,
            genero,
            funcao,
            tipoId,
            estadoCivil,
            nacionalidade,
            nomePai: filiacao?.mae,
            nomeMae: filiacao?.mae,
            maeNacionalidade: filiacao?.maeNacionalidade,
            paiNacionalidade: filiacao?.paiNacionalidade,
            vistoId: filiacao?.vistoId,
            mob,
            projectoId,
            sindicato,
            passaporteDataValidade: passaporte?.dataValidade,
            passaporteDataEmissao: passaporte?.dataEmissao,
            passaporteEmissora: passaporte?.emissora,
            passaporteNumero: passaporte?.numero,
            sindicato,
            clienteId,

            funcionarioId: req?.sessao?.id,
            beneficiarioId,
            funcao,
            paisNascimento,
            tipoVistoId,


        });

        return res.status(201).json({
            processo,
            message: "Pedido Submetido com sucesso!!"
        });


    }

    async count(req, res) {
        const processoRepository = new ProcessoRepository();
        let query = buildWhereClause(req.query)
        const { orderBy, order } = query


        const { total } = await processoRepository.count({
            whereClause: query,
        });

        return res.json({ total });
    };
    async countProgresso(req, res) {
        const processoRepository = new ProcessoRepository();
        const { order, orderBy, statusId, stepId, projectoId, month, year, beneficiarioId, clienteId, date, responsavelId, tipoVistoId, processoId } = req.query
        console.log("PARAMS", req.query);
        let attributes = []
        const filterProcesso = { beneficiarioId, clienteId, projectoId, id: processoId, date, tipoVistoId, month, year }
        const filterProgresso = { statusId, stepId, responsavelId }

        const whereClauseForProcesso = buildWhereClause(filterProcesso)
        console.log("PROCESSOS ", filterProcesso);
        const whereClauseForProgresso = buildWhereClause(filterProgresso)
        console.log("PROGRESSO ", filterProgresso);

        if (filterProcesso) {
            const processos = await Processos.findAll({
                where: whereClauseForProcesso
            });

            if (processos.length === 0) {
                return res.status(200).json({
                    progresso: 0,
                    total: 0,
                    status: "ok",
                    code: 200
                });
            }
        }
        const { progresso, total } = await processoRepository.progresso({
            whereClause: filterProgresso,
            whereClauseForProcesso: filterProcesso
        })

        return res.json({ total });
    };
    async progresso(req, res) {
        const processoRepository = new ProcessoRepository();
        const { order, orderBy, statusId, stepId, projectoId, month, year, beneficiarioId, clienteId, date, responsavelId, tipoVistoId, processoId } = req.query
        console.log("PARAMS", req.query);
        let attributes = []
        const filterProcesso = { beneficiarioId, clienteId, projectoId, id: processoId, date, tipoVistoId, month, year }
        const filterProgresso = { statusId, stepId, responsavelId }

        const whereClauseForProcesso = buildWhereClause(filterProcesso)
        console.log("PROCESSOS ", filterProcesso);
        const whereClauseForProgresso = buildWhereClause(filterProgresso)
        console.log("PROGRESSO ", filterProgresso);

        if (filterProcesso) {
            const processos = await Processos.findAll({
                where: whereClauseForProcesso
            });

            if (processos.length === 0) {
                return res.status(200).json({
                    progresso: 0,
                    total: 0,
                    status: "ok",
                    code: 200
                });
            }
        }
        const { progresso, total } = await processoRepository.progresso({
            whereClause: filterProgresso, attributes, includeClause: [
                {
                    model: Processos,
                    as: "processo",
                    where: whereClauseForProcesso,
                    order: [[orderBy, order]],
                    include: [{
                        model: TipoVistos,
                        as: "tipoVisto"
                    },
                    {
                        model: Clientes,
                        as: "cliente"
                    },
                    {
                        model: Tecnicos,
                        as: "beneficiario",
                        include: [
                            {
                                model: Ficheiros,
                                as: "avatar",
                                attributes: ["id", "path", "name", "url"],
                            }
                        ]
                    },
                    {
                        model: Projectos,
                        as: "projecto"
                    }]

                },
                {
                    model: Steps,
                    as: "step",
                    attributes: ["id", "nome"],
                    // include: [
                    //     {
                    //         model: Usuarios,
                    //         throught: StepResponsavel
                    //     }
                    // ]

                },
                {
                    model: StatusDeSteps,
                    as: "status",
                    attributes: ["id", "nome"]

                },
                {
                    model: Usuarios,
                    as: "responsavel"
                },
                {
                    model: Usuarios,
                    as: "funcionario",
                    attributes: ["id", "nome", "painelId"],
                    include: [
                        {
                            model: Painels,
                            attributes: ["id", "nome"],
                            as: "painel"
                        }
                    ]

                },


            ]
        })
        return res.status(200).json({
            progresso,
            total,
            status: "ok",
            code: 200
        });
    }
    async ficha(req, res) {
        const processoRepository = new ProcessoRepository();
        const { processoId } = req.query
        console.log("PARAMS", req.query);
        let attributes = []
        const filterProcesso = { id: processoId }

        const whereClauseForProcesso = buildWhereClause(filterProcesso)
        const qrCodeUrl = await QRCode.toDataURL(process.env.APP_FRONT_URL + `processos/${processoId}/detail`);

        if (filterProcesso) {
            const processos = await Processos.findOne({
                where: whereClauseForProcesso
            });

            if (processos.length === 0) {
                return res.status(200).json({
                    progresso: 0,
                    total: 0,
                    status: "ok",
                    code: 200
                });
            }
        }
        let { processos, total } = await processoRepository.getAllCustom({
            whereClause: filterProcesso, attributes, includeClause: [
                {

                    model: TipoVistos,
                    as: "tipoVisto"
                },
                {
                    model: Clientes,
                    as: "cliente"
                },
                {
                    model: Tecnicos,
                    as: "beneficiario",
                    include: [
                        {
                            model: Ficheiros,
                            as: "avatar",
                            attributes: ["id", "path", "name", "url"],
                        }
                    ]
                },
                {
                    model: Projectos,
                    as: "projecto"
                },

            ]
        });
        const templateName = path.join(__dirname, "Ficha.ejs")
        processos[0].qrCodeUrl = qrCodeUrl
        PDFGenerator.executeDowload({ data: processos[0], templateName, res, })

    }
    async mapa(req, res) {
        const processoRepository = new ProcessoRepository();
        const { order, orderBy, statusId, stepId, projectoId, month, year, beneficiarioId, clienteId, date, responsavelId, tipoVistoId, processoId } = req.query
        console.log("PARAMS", req.query);
        let attributes = []
        const filterProcesso = { beneficiarioId, clienteId, projectoId, id: processoId, date, tipoVistoId, month, year }
        const filterProgresso = { statusId, stepId, responsavelId }

        const whereClauseForProcesso = buildWhereClause(filterProcesso)
        console.log("PROCESSOS ", filterProcesso);
        const whereClauseForProgresso = buildWhereClause(filterProgresso)
        console.log("PROGRESSO ", filterProgresso);

        if (filterProcesso) {
            const processos = await Processos.findAll({
                where: whereClauseForProcesso
            });

            if (processos.length === 0) {
                return res.status(200).json({
                    progresso: 0,
                    total: 0,
                    status: "ok",
                    code: 200
                });
            }
        }
        const { progresso, total } = await processoRepository.progresso({
            whereClause: filterProgresso, attributes, includeClause: [
                {
                    model: Processos,
                    as: "processo",
                    where: whereClauseForProcesso,
                    order: [[orderBy, order]],
                    include: [{
                        model: TipoVistos,
                        as: "tipoVisto"
                    },
                    {
                        model: Clientes,
                        as: "cliente"
                    },
                    {
                        model: Tecnicos,
                        as: "beneficiario",
                        include: [
                            {
                                model: Ficheiros,
                                as: "avatar",
                                attributes: ["id", "path", "name", "url"],
                            }
                        ]
                    },
                    {
                        model: Projectos,
                        as: "projecto"
                    },

                    ]

                },
                {
                    model: Steps,
                    as: "step",
                    attributes: ["id", "nome"],
                    // include: [
                    //     {
                    //         model: Usuarios,
                    //         throught: StepResponsavel
                    //     }
                    // ]

                },
                {
                    model: StatusDeSteps,
                    as: "status",
                    attributes: ["id", "nome"]

                },
                {
                    model: Usuarios,
                    as: "responsavel"
                },
                {
                    model: Usuarios,
                    as: "funcionario",
                    attributes: ["id", "nome", "painelId"],
                    include: [
                        {
                            model: Painels,
                            attributes: ["id", "nome"],
                            as: "painel"
                        }
                    ]

                },


            ]
        });
        const templateName = path.join(__dirname, "Mapa.ejs")
        PDFGenerator.executeDowload({ data: progresso, templateName, res, })
    }
    async list(req, res) {
        const processoRepository = new ProcessoRepository();
        const { order, orderBy } = req.query
        console.log("PARAMS", req.query);
        let attributes = []
        const { processos, total } = await processoRepository.getAllCustom({
            whereClause: req.query, orderClause: [{ orderBy, order, }], attributes, includeClause: [{
                model: Tecnicos,
                as: "beneficiario",
            },
            {
                model: Clientes,
                as: "cliente",

            },

            ]
        })
        return res.status(200).json({
            processos,
            total,
            status: "ok",
            code: 200
        });
    }

    async getOne(req, res) {
        const processoRepository = new ProcessoRepository();
        const { id } = req.params
        const processo = await processoRepository.getById({ id })
        return res.status(200).json({
            processo,
            status: "ok",
            code: 200
        });

    }
    async update(req, res) {
        const { id } = req.params;
        const { statusId, stepId, descricao } = req.body
        const result = await UpdateProcessoUseCase.statusAndStep({ descricao, processoId: id, statusId, stepId })

        return res.status(201).json({
            message: "operacao realizada com sucesso",
            status: "success",
            code: 201
        });

    }
    async delete(req, res) {
        const processoRepository = new ProcessoRepository();
        const { id } = req.params;
        const cargo = await processoRepository.delete({ id })
        return res.status(200).json({
            message: "operacao realizada com sucesso",
            status: "ok",
            code: 200
        });

    }


}
export default new ProcessoController();