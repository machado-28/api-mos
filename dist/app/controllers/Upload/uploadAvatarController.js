"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Ficheiros = _interopRequireDefault(require("../../models/Ficheiros"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UploadAvatarController {
  async executar(req, res) {
    try {
      const {
        originalname: name,
        filename: path
      } = req.file;
      console.log(req.avatar);
      const avatar = await _Ficheiros.default.create({
        name,
        path
      });
      return res.status(201).json({
        mensagem: "Upload realizado com sucesso!",
        status: 201,
        avatar: avatar
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "Erro ao realizar esta operacao",
        descricao: erro,
        status: 500
      });
    }
  }
}
var _default = exports.default = new UploadAvatarController();