import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError } from "../../helpers/api-errors";
import CreatePedidoDeEmissaoUseCase from "../../Usecases/Pedidos/CreatePedidoDeEmissaoUseCase";
import CreateRequerenteUsecase from "../../Usecases/Requerente/CreateRequerenteUsecase";

class CratePedidoEmissaoController {
    async store(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            dataNascimento: yup.date().required(),
            genero: yup.string().required(),
            estadoCivil: yup.string().required(),
            nacionalidade: yup.string().required(),
            sindicato: yup.string().required(),
            nascimento: yup.object({
                pais: yup.string().required(),
                provincia: yup.string().required(),
                municipio: yup.string().required(),
                bairro: yup.string().required(),
            }).required(),
            filiacao: yup.object({
                mae: yup.string().required(),
                pai: yup.string().required(),
            }).required(),
            // passaporte: yup.object({
            //     numero: yup.string().required(),
            //     dataEmissao: yup.string().required(),
            //     dataValidade: yup.string().required(),
            //     emissora: yup.string().required(),
            // }).required(),
            projecto: yup.string().required(),
            contacto: yup.object({
                telefone: yup.string().required(),
                email: yup.string().email().required(),
            }),
            enderecoAngola: yup.object({
                provincia: yup.string().required(),
                cidade: yup.string().required(),
            }).required()

        });

        let inputValidation = true;
        const { tipoVistoId = 1 } = req.params
        req.body.tipoVistoId = tipoVistoId
        console.log('BODY', req.body);

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
            dataNascimento,
            genero,
            estadoCivil,
            codigoPostal,
            nacionalidade,
            paisNascimento,
            numDocumentoIdentificacao,
            contacto,
            enderecoAngola,
            enderecoOrigem
        } = req.body

        // const { email, telefone } = contacto
        // const {
        //     provincia: provinciaActual,
        //     cidade: cidadeAtual }
        //     = enderecoAngola;

        // const {
        //     cidade: cidadePermante,
        //     provincia: provinciaPermanente,
        //     numCasa
        // } = enderecoOrigem

        const requerente = await CreateRequerenteUsecase.execute(
            req.body
        );

        const { id: requerenteId, numeroPassaporte } = requerente

        console.log("PAP", requerenteId);

        const pedido = await CreatePedidoDeEmissaoUseCase.execute({ requerenteId, fazeId: 1, statusId: 1, tipoVistoId })

        return res.status(201).json({
            pedido,
            message: "Pedido Submetido com sucesso!!"
        })
    }

}
export default new CratePedidoEmissaoController()