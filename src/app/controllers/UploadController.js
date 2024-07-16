import Ficheiros from "../models/Ficheiros";

class UploadController {
  async store(req, res) {
    const files = req.files;
    let { donoId, tipoId, processoId } = req.params

    console.log(files);
    files.map((file) => {
      file.requerenteId = Number(donoId);
      file.tipoId = Number(tipoId);
      file.path = file.filename
      file.processoId = Number(processoId)
      file.name = file.originalname
    });

    const filesSaved = await Ficheiros.bulkCreate(files)
    return res.status(201).json(filesSaved);
  }
  async storeOne(req, res) {
    const { filename: name, originalname: path } = req.file

    const file = await Ficheiros.create({
      name,
      path
    });

    return res.status(201).json(file)
  }
}
export default new UploadController();
