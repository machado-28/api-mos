"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EnviarEmailUseCase {
  async execute() {
    let transporter = _nodemailer.default.createTransport({
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
      console.log(message);
    }).catch(err => {
      console.log(err);
    });
  }
}
var _default = exports.default = new EnviarEmailUseCase();