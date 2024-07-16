
import pdf from "html-pdf"
import ejs from 'ejs'
import fs from 'fs'
import path from "path";


class GerarPDF {

    async criar(req, res) {
        // Dados para preencher o template
        const data = req.body;

        // Caminho do arquivo HTML de template

        const templatePath = path.join(__dirname, 'documento.ejs');

        // Renderizar o template EJS com os dados fornecidos
        ejs.renderFile(templatePath, { data }, (err, html) => {
            if (err) {
                console.error('Erro ao renderizar o template:', err);
                res.status(500).send('Erro ao gerar o PDF');
                return;
            }

            // Opções para gerar o PDF
            const options = {
                orientation: 'landscape', // 'landscape' para paisagem, 'portrait' para retrato
                border: '10mm',           // Margem de 10mm
                format: 'A4'              // Tamanho do papel A4
            };

            // Gerar o PDF
            pdf.create(html, options).toBuffer((err, buffer) => {
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

export default new GerarPDF()