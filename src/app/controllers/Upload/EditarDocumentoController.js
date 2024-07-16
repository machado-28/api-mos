/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import * as yup from "yup";
import Documento from "../../models/Documento";

class EditarDocumentoController {
  async executar(req, res) {
    try {
      const { id_proprietario, id } = req.params;

      const escola = await Documento.findOne({
        where: { id },
      });
      if (!escola)
        return res
          .status(404)
          .json({ status: 404, erro: "Documento invalido!" });

      await escola.update({
        id_proprietario,
      });

      return res
        .status(200)
        .json({ status: 200, mensagem: "operacao realizada com sucesso!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ erro: "falha ao realizar esta operação", status: 500 });
    }
  }
}
export default new EditarDocumentoController();
