import Ficheiros from "../../models/Ficheiros";

class UploadAvatarController {
  async executar(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;
      console.log(req.avatar);

      const avatar = await Ficheiros.create({
        name,
        path,
      });
      return res.status(201).json({
        mensagem: "Upload realizado com sucesso!",
        status: 201,
        avatar: avatar,
      });
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({
          erro: "Erro ao realizar esta operacao",
          descricao: erro,
          status: 500,
        });
    }
  }
}
export default new UploadAvatarController();
