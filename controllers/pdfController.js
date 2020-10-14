const pdf = require('html-pdf');
const ejs = require('ejs');
const moment = require('../moment-with-locales');

const createPdf = async (req, res, data, url, orientation , name) => {
    let html;
    const options = { filename: name, format: 'A4', orientation: orientation, directory: '/', type: "pdf" };
    try {
        
        html = await ejs.renderFile(url, data)
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