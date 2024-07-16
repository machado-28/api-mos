
import Ficheiros from "../../models/Ficheiros";
import fs from "fs";
import path from "path";

import { FicheiroRepository } from "../../CustomRepositories/FicheiroRepositorY";
 
class UploadController {
  async delete(req, res) {
    const { id } = req.params;
    const { path: src } = await Ficheiros.findOne({ where: { id } });

    await Documento.destroy({ where: { id } });
    console.log(src);
    fs.unlinkSync(
      path.resolve(__dirname, "..", "..", "..", "..", "temp", "upload/", src)
    );
    return res
      .status(200)
      .json({ mensagem: " arquivo deletado com sucesso!", status: 200 });
  }

  async store(req, res) {
    try {
      console.log("REQUEST", req.file);
      const { originalname: name, filename: path, } = req.file;
      const { tipoId } = req.params

      console.log("DOCUMENTO TIPO", tipoId);

      const documento = await Ficheiros.create({
        name,
        path,
        requerenteId,
        emissora,
        numero,
        dataEmissao,
        dataValidade,
        tipoId,
      });
      return res
        .status(201)
        .json({
          documento,
          mensagem: "Upload realizado com sucesso!",
          status: 201,
        });
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({ erro: "erro nos arquivos", descricao: erro, status: 500 });
    }
  }

  async stores(req, res) {
    try {
      const { tipoId, requerenteId, pedidoId, processoId } = req.query;
      console.log("REQUEST FILE", req.query);
      const { originalname: name, filename: path } = req.file;
      const ficheiroRepository = new FicheiroRepository();
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
       

      return res
        .status(201)
        .json({
          documento,
          mensagem: "Upload realizado com sucesso!",
          status: 201,
        });
    } catch (erro) {
      console.log(erro);
      return res
        .status(500)
        .json({ erro: "erro nos arquivos", descricao: erro, status: 500 });
    }
  }
  async storeOne(req, res) {
    const { filename: path, originalname: name } = req.file

    const file = await Ficheiros.create({
      name,
      path
    });

    return res.status(201).json(file)
  }
}
export default new UploadController();
