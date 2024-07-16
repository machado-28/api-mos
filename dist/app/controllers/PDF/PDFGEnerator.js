"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _htmlPdf = _interopRequireDefault(require("html-pdf"));
var _ejs = _interopRequireDefault(require("ejs"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PDFGenerator {
  executeDowload({
    data,
    templateName,
    optionsPapper = {
      format: 'Letter'
    },
    res
  }) {
    const templatePath = _path.default.join(__dirname, templateName + ".ejs");

    // Renderizar o template EJS com os dados fornecidos
    _ejs.default.renderFile(templatePath, {
      data
    }, (err, html) => {
      if (err) {
        console.error('Erro ao renderizar o template:', err);
        res.status(500).send('Erro ao gerar o PDF');
        return;
      }

      // Opções para gerar o PDF
      const options = optionsPapper;

      // Gerar o PDF
      _htmlPdf.default.create(html, options).toBuffer((err, buffer) => {
        if (err) {
          console.error('Erro ao gerar o PDF:', err);
          res.status(500).send('Erro ao gerar o PDF');
          return;
        }
        console.log('PDF gerado com sucesso');

        // Enviar o arquivo PDF gerado como resposta para download
        res.setHeader('Content-Disposition', 'attachment; filename=documento.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(buffer);
      });
    });
  }
}
var _default = exports.default = new PDFGenerator();