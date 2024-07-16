import jwt from "jsonwebtoken";
import * as yup from "yup";
import "./../../config/yup";
import "dotenv/config";
import authConfig from "../../config/auth";
import Usuario from "../models/Usuarios";
import { BadRequestError } from "../helpers/api-errors";
import Painels from "../models/Painels";


class IniciarSessaoController {
  async executar(req, res) {
    const schema = yup.object().shape({
      email: yup.string().required(),
      senha: yup.string().required(),
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

    const { email, senha } = req.body;

    const usuarioExiste = await Usuario.findOne({
      where: { usuario: email },
      include: [
        {
          model: Painels,
          as: "painel",
        }
      ]
    });

    if (!usuarioExiste) {
      throw new BadRequestError("usuario ou senha Incorrectos!")
    }
    if (!(await usuarioExiste.validarSenha(senha))) {
      return res.status(400).json({ message: "usuario ou senha incorrecto!" });
    }
    const {
      painel,
      id,
      nome,
      clienteId,
      avatarUrl

    } = usuarioExiste;
    const token = jwt.sign(
      {
        id,
        painel,
        clienteId,
        id,
        nome,
        avatarUrl
      },
      authConfig.secret,
      { expiresIn: authConfig.expiresIn }
    );

    return res.status(200).json({
      user: {
        id,
        painel,
        id,
        clienteId,
        nome,
        avatarUrl,
        token

      }, statusCode: 200
    });

  }
}

export default new IniciarSessaoController();
