import nodemailer from "nodemailer"

class EnviarEmailUseCase {

    async execute() {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "dev.antoniomachado@gmail.com",
                pass: "const=password2"
            }
        });

        transporter.sendMail({
            from: "Metalica <dev.antoniomachado@gmail.com>",
            to: "dev28machado@gmail.com",
            subject: "Seu Cadastro foi realizado com Sucesso!!",
            text: "O seu email foi cadastrado no divvi.company para receber as novidades e atualizações do nosso sistema!!",
            html: "O seu email foi cadastrado no  <a href= 'http://divvi.company/'> divvi.company</a>  para receber as novidades e atualizações do nosso sistema!!"

        }).then(message => {
            console.log(message)
        }).catch(err => {
            console.log(err);
        })
    }
}

export default new EnviarEmailUseCase()
