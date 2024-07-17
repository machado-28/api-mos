import pdf from "html-pdf"
import ejs from 'ejs'
import fs from 'fs'
import path from "path";

class PDFGenerator {
    executeDowload({ data, templateName, optionsPapper = { format: 'A4' } }) {
        const templatePath = path.join(__dirname, templateName + ".ejs");

        // Renderizar o template EJS com os dados fornecidos
        ejs.renderFile(templatePath, { data }, (err, html) => {
            if (err) {
                console.error('Erro ao renderizar o template:', err);
                res.status(500).send('Erro ao gerar o PDF');
                return;
            }

            // Opções para gerar o PDF
            const options = optionsPapper;

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
    executeSaveAndShow() {

    }
}
