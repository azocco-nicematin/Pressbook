const pdf = require('html-pdf');
const ejs = require('ejs');
const moment = require('../moment-with-locales');

const createPdf = async (req, res, data) => {
    let html;
    const options = { filename: 'dossier.pdf', format: 'A4', orientation: 'portrait', directory: '/', type: "pdf" };

    try {
        data.date_enlevement = moment(data.date_enlevement).format('YYYY-MM-DD');
        html = await ejs.renderFile('views/template/pdf.ejs', data)
        return pdf.create(html, options).toFile( async (err, result) => {
            if (err) {
                console.log(err);
            }
            res.status(200).json({
                status: 'success'
            });
        });
        //console.log(pdfCreated)
    } catch (e) {
        res.end('An error occurred');
        console.log(e);
    }
}

module.exports = {
    createPdf: createPdf
};