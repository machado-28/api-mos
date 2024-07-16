"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Ficheiros = _interopRequireDefault(require("../../models/Ficheiros"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _FicheiroRepositorY = require("../../CustomRepositories/FicheiroRepositorY");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UploadController {
  async delete(req, res) {
    const {
      id
    } = req.params;
    const {
      path: src
    } = await _Ficheiros.default.findOne({
      where: {
        id
      }
    });
    await Documento.destroy({
      where: {
        id
      }
    });
    console.log(src);
    _fs.default.unlinkSync(_path.default.resolve(__dirname, "..", "..", "..", "..", "temp", "upload/", src));
    return res.status(200).json({
      mensagem: " arquivo deletado com sucesso!",
      status: 200
    });
  }
  async store(req, res) {
    try {
      console.log("REQUEST", req.file);
      const {
        originalname: name,
        filename: path
      } = req.file;
      const {
        tipoId
      } = req.params;
      console.log("DOCUMENTO TIPO", tipoId);
      const documento = await _Ficheiros.default.create({
        name,
        path,
        requerenteId,
        emissora,
        numero,
        dataEmissao,
        dataValidade,
        tipoId
      });
      return res.status(201).json({
        documento,
        mensagem: "Upload realizado com sucesso!",
        status: 201
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "erro nos arquivos",
        descricao: erro,
        status: 500
      });
    }
  }
  async stores(req, res) {
    try {
      const {
        tipoId,
        requerenteId,
        pedidoId,
        processoId
      } = req.query;
      console.log("REQUEST FILE", req.query);
      const {
        originalname: name,
        filename: path
      } = req.file;
      const ficheiroRepository = new _FicheiroRepositorY.FicheiroRepository();
      // if (numero) {
      //   const existDcumento = await documentosRepository.getOneByNumero({ numero });
      //   throw new BadRequestError(`O documento ${numero}, ja foi usado`)
      // };
      console.log("DADO DA REQUISICAO", req.query);
      const documento = await ficheiroRepository.create({
        path,
        name,
        tipoId,
        requerenteId,
        pedidoId,
        processoId
      });
      return res.status(201).json({
        documento,
        mensagem: "Upload realizado com sucesso!",
        status: 201
      });
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({
        erro: "erro nos arquivos",
        descricao: erro,
        status: 500
      });
    }
  }
  async storeOne(req, res) {
    const {
      filename: path,
      originalname: name
    } = req.file;
    const file = await _Ficheiros.default.create({
      name,
      path
    });
    return res.status(201).json(file);
  }
}
var _default = exports.default = new UploadController();