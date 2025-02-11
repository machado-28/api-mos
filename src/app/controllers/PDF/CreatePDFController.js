import PDFGenerator from "./PDFGenerator";

class CreatePDFController {
    async createMapa(req, res) {
        const tables = [
            {
                nomeProjeto: 'AGOGO',
                visto: "Border Visa",
                mes: 'Junho',
                ano: '2024',
                dados: [
                    {
                        requerente: 'Paulo bungo',
                        dataSolicitacao: '01/01/2024',
                        nome: 'Nome 1',
                        nacionalidade: 'Angolana',
                        sexo: 'M',
                        passaporte: 'P123456',
                        mob: '900123456'
                    },
                    {
                        requerente: 'Suresh Palasseril Ramakrishnan',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    }
                    ,
                    {
                        requerente: 'Somakumar Kuruvath Ramakrishnan',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    },
                    {
                        requerente: 'Cecíclia',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    }, {
                        requerente: 'Cecíclia',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    },
                    {
                        requerente: 'Cecíclia',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    },
                    {
                        requerente: 'Cinctia',
                        dataSolicitacao: '01/01/2024',
                        nome: 'Nome 1',
                        nacionalidade: 'Angolana',
                        sexo: 'M',
                        passaporte: 'P123456',
                        mob: '900123456'
                    },
                    {
                        requerente: 'Cintia',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    }
                    ,
                    {
                        requerente: 'Flora',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    },
                    {
                        requerente: 'Cecíclia',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    }, {
                        requerente: 'Cecíclia',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    },

                    {
                        requerente: 'Cecíclia',
                        dataSolicitacao: '02/02/2024',
                        nome: 'Nome 2',
                        nacionalidade: 'Angolana',
                        sexo: 'F',
                        passaporte: 'P234567',
                        mob: '29/10/2024',
                        recepcao: '29/10/2024',
                        envio: '29/10/2024'
                    },



                ]
            },

        ];

        let data = await PDFGenerator.executeDowload({ data: tables, templateName: 'documento', res });
        return data
    }
    async createSMEForm(req, res) {
        const { processoId } = req.body


        let processo = {
            nome: "Machado",
            nomePai: "xxxxxxxx",
            nacionalidadePai: "xxxxxxxx",
            nomeMae: "xxxxxxxx",
            nacionalidadeMae: "xxxxxxxx",
            dataNascimento: "xxxxxxxx",
            localNascimento: "xxxxxxxx",
            estadoCivil: "xxxxxxxx",
            passaporte: "xxxxxxxx",
            localEmissao: "xxxxxxxx",
            dataEmissao: "xxxxxxxx",
            dataValidade: "xxxxxxxx",
            email: "xxxxxxxx",
            telefone: "xxxxxxxx",
            hospedagemRua: "xxxxxxxx",
            hospedagemAldeia: "xxxxxxxx",
            hospedagemProvincia: "xxxxxxxx",
            profissao: "xxxxxxxx",
            funcao: "xxxxxxxx"

        }

        const data = {
            insigniaUrl: 'http://example.com/insignia.png',  // URL da insígnia
            nomeCompleto: 'John Doe',
            dataNascimento: '1990-01-01',
            nacionalidade: 'Brasileira',
            passaporte: 'AB1234567',
            dataEmissao: '2020-01-01',
            dataValidade: '2030-01-01',
            motivo: 'Turismo',
            endereco: 'Rua Exemplo, 123, Luanda, Angola',
            telefone: '+244123456789',
            email: 'john.doe@example.com',

        };
        return await PDFGenerator.executeDowload({ data, templateName: 'sme', res });

    }
}
export default new CreatePDFController();
