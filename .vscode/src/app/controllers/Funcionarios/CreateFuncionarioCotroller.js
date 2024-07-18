import * as yup from "yup";
import '../../../config/yup'
import CreateFuncionarioUsecases from "../../usecases/CreateFuncionarioUsecases";
import { BadRequestError } from "../../helpers/api-errors";


class CreateFuncionarioCotroller {
    async store(req, res) {
        const schema = yup.object().shape({
            nome: yup.string().required(),
            dataNascimento: yup.date().required(),
            nif: yup.string().required(),
            genero: yup.string().required(),
            estadoCivil: yup.string().required(),
            datavalidadeNif: yup.date().required(),
            nacionalidade: yup.string().required(),
            endereco: yup.object({
                municipio: yup.string().required(),
                bairro: yup.string().required(),
 
            }).required(),
            contacto: yup.object({
                telefone: yup.string().required(),
                email: yup.string().email().required(),
            }),
            financa: yup.object({
                iban: yup.string().required(),
                salarioBruto: yup.string().required(),
                salarioPorDia: yup.string().required(),
            }),
            contrato: yup.object({
                dataInicio: yup.string().required(),
                dataSaida: yup.string().required(),
                cargoId: yup.string().required(),
            }),
        });

        let inputValidation = true;

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
            nif,
            genero,
            datavalidadeNif,
            estadoCivil,
            nacionalidade,
            contacto,
            endereco,
            financa,
            contrato,
        } = req.body

        const { dataFim, dataInicio, cargoId, } = contrato
        const funcionario = await CreateFuncionarioUsecases.execute({
            nome,
            dataNascimento,
            nif,
            genero,
            estadoCivil,
            nacionalidade,
            datavalidadeNif,
            contacto,
            endereco,
            financa,
            cargoId,
            contrato,
        });


        return res.status(201).json({ message: "Funcionário Registrados com sucesso!" });

    }

}
export default new CreateFuncionarioCotroller()