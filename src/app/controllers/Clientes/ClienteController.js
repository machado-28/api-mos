import "../../../config/yup";
import * as yup from "yup";
import { BadRequestError } from "../../helpers/api-errors";
import CreateClienteUsecase from "../../Usecases/Clientes/CreateClienteUsecase";
import { ClienteRepository } from "../../CustomRepositories/ClienteRepository";
import { ProcessoRepository } from "../../CustomRepositories/ProcessoRepository";
import buildWhereClause from "../../utils/buildWhereClause";
import QRCode from 'qrcode'
import path from "path";
import PDFGenerator from "../PDF/PDFGenerator";


class ClienteController {
    async create(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            nomeEmpresa: yup.string().required(),
            telefone1: yup.string().required(),
            telefone2: yup.string().required(),
            email: yup.string().email().required(),
            senha: yup.string().required(),
            usuario: yup.string().required(),
            nif: yup.string().required(),
            ramo: yup.string().required(),
            site: yup.string().required(),
            endereco: yup.object({
                provincia: yup.string().required(),
                cidade: yup.string().required(),
                comuna: yup.string().required(),
            }).required(),
        });

        let inputValidation = true;
        const usuarioLogado = req.sessao

        try {
            await schema.validate(req.body);
        } catch (err) {
            console.error(req.body);
            inputValidation = false;
            const erro = err.errors[0];
            throw new BadRequestError(erro); // Lança o erro para a middleware de erros lidar com ele
        }

        const {
            nome,
            telefone1,
            telefone2,
            email,
            usuario,
            senha,
            nomeEmpresa,
            nif,
            ramo,
            endereco

        } = req.body
        const {
            comuna,
            cidade, municipio, provincia } = endereco
        const cliente = await CreateClienteUsecase.execute({
            nome,
            telefone1,
            telefone2,
            email,
            usuario,
            senha,
            nomeEmpresa,
            nif,
            ramo,
            provincia,
            municipio,
            comuna,
            cidade,
            usuarioId: usuarioLogado?.id,
        });

        return res.status(201).json({
            cliente,
            message: "cliente Registrado com Sucesso!",
            status: "ok",
            code: 200
        })
    }

    async getAll(req, res) {
        const clienteRepository = new ClienteRepository()
        const { clientes, total } = await clienteRepository.getAll();
        return res.status(200).json({
            clientes,
            total,
            status: "ok",
            code: 200
        });
    }

    async count(req, res) {
        const clienteRepository = new ClienteRepository()
        const { total } = await clienteRepository.count({});
        return res.status(200).json({
            total,
            status: "ok",
            code: 200
        });
    }

    async getAllProcessos(req, res) {
        const { clienteId } = req.params;
        const ClienteRepository = new ClienteRepository();
        const processosRepository = new ProcessoRepository();
        const { processos, total } = await processosRepository.getAllByCliente({ clienteId });
        const cliente = await clienteRepository.getAll();
        return res.status(200).json({
            cliente,
            processos,
            painelId: 10,
            total,
            status: "ok",
            code: 200
        });
    }
    async getAllProcessosStatus(req, res) {
        const { clienteId } = req.params;
        const { statusId, fazeId } = req.query;

        const ClienteRepository = new ClienteRepository();
        const processosRepository = new ProcessoRepository();
        const { processos, total } = await processosRepository.getAllByClienteAndStatus({ clienteId });
        const cliente = await clienteRepository.getAll();
        return res.status(200).json({
            cliente,
            processos,
            total,
            status: "ok",
            code: 200
        });
    }

    async getAllProjectos(req, res) {
        const { clienteId } = req.params;
        const ClienteRepository = new ClienteRepository();
        const processosRepository = new ProcessoRepository();
        const { processos, total } = await processosRepository.getAllByCliente({ clienteId });
        const cliente = await clienteRepository.getAll();
        return res.status(200).json({
            cliente,
            processos,
            total,
            status: "ok",
            code: 200
        });
    }

    async getAllPedidos(req, res) {
        const ClienteRepository = new ClienteRepository()
        const { clientes, total } = await clienteRepository.getAll();
        return res.status(200).json({
            clientes,
            total,
            status: "ok",
            code: 200
        });
    }

    async getOne(req, res) {

        const { passaporte, id } = req.params
        const clienteRepository = new ClienteRepository()
        const cliente = await clienteRepository.getById({ id });
        return res.status(200).json({
            cliente,
            status: "ok",
            code: 200
        })
    }
    async getByPassaporte(req, res) {
        const { passaporte } = req.params
        const ClienteRepository = new ClienteRepository()
        const cliente = await clienteRepository.getByPassaporte({ passaporte });
        return res.status(200).json({
            cliente,
            status: "ok",
            code: 200
        })
    }
    async ficha(req, res) {
        const clienteRepository = new ClienteRepository();
        const { clienteId } = req.query
        console.log("PARAMS", req.query);
        let attributes = []
        const filterCliente = { id: clienteId }

        const whereClauseForCliente = buildWhereClause(filterCliente)
        const qrCodeUrl = await QRCode.toDataURL(process.env.APP_FRONT_URL_DEV + `clientes/${clienteId}/detail`);


        let { clientes, total } = await clienteRepository.getAllCustom({
            whereClause: filterCliente, attributes, includeClause: [
            ]
        });
        const templateName = path.join(__dirname, "Ficha.ejs")
        clientes[0].qrCodeUrl = qrCodeUrl
        PDFGenerator.executeDowload({ data: clientes[0], templateName, res, })

    }

    async ListaPdf(req, res) {
        const clienteRepository = new ClienteRepository();
        const { clienteId } = req.query
        console.log("PARAMS", req.query);
        let attributes = []


        const whereClauseForCliente = buildWhereClause(req.query)
        const qrCodeUrl = await QRCode.toDataURL(process.env.APP_FRONT_URL_DEV + `clientes/${clienteId}/detail`);


        let { clientes, total } = await clienteRepository.getAllCustom({
            whereClause: whereClauseForCliente, attributes, includeClause: [
            ]
        });
        const templateName = path.join(__dirname, "Lista.ejs")
        clientes[0].qrCodeUrl = qrCodeUrl
        PDFGenerator.executeDowload({ data: clientes, templateName, res, })

    }
}
export default new ClienteController()