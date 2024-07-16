import * as yup from "yup";
import '../../../config/yup'
import { BadRequestError } from "../../helpers/api-errors";
import UpdateRequerenteUsecase from "../../Usecases/Requerente/UpdateRequerenteUsecase";

class UpdatePedidoEmissaoController {
    async store(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            dataNascimento: yup.date().required(),
            descricao: yup.string().default("xxxxxxxxxxxxxxx"),
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
        const { tipoVistoId, id } = req.params
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

        const requerente = await UpdateRequerenteUsecase.execute(
            req.body
        );


        return res.status(201).json({

            message: "Pedido Actualizado com sucesso!"
        })
    }

}
export default new UpdatePedidoEmissaoController()