"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UploadController {
  async store(req, res) {
    const files = req.files;
    let {
      donoId,
      tipoId,
      processoId
    } = req.params;
    console.log(files);
    files.map(file => {
      file.requerenteId = Number(donoId);
      file.tipoId = Number(tipoId);
      file.path = file.filename;
      file.processoId = Number(processoId);
      file.name = file.originalname;
    });
    const filesSaved = await _Ficheiros.default.bulkCreate(files);
    return res.status(201).json(filesSaved);
  }
  async storeOne(req, res) {
    const {
      filename: name,
      originalname: path
    } = req.file;
    const file = await _Ficheiros.default.create({
      name,
      path
    });
    return res.status(201).json(file);
  }
}
var _default = exports.default = new UploadController();