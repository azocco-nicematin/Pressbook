/**
 * Envoi d'un mail lors de la clôture d'un service
 * @module emailController
 */

const nodemailer = require('nodemailer');
const ejs = require('ejs');
const CONFIG = require('./../config');

let transporter = nodemailer.createTransport(CONFIG.mailCredentials);

/**
 * Envoi d'un mail récapitulatif suite à la clôture d'un service
 * @param {*} req 
 * @param {*} res 
 * @param {file} mail - Template mail au format ejs 
 * @param {array} listeEmail - Tableau des mails administrateur autorisés 
 * @param {string} subject - Sujet du mail
 * @param {string} info - Titre du mail
 * @param {string} serviceUser - Service de l'utilisateur concerné par le mail
 */
const sendEmail = (req, res, mail, listeEmail, subject, serviceUser, type) => {
    try {
        ejs.renderFile('views/mail' + mail, {
            info : req.body,
            serviceUser: serviceUser,
            type : type
        }, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                let mainOptions = {
                    from: 'Pressbook <pressbook-noreply@nicematin.fr>',
                    to: listeEmail,
                    subject: subject,
                    html: data,
                    attachments: [{
                        filename: 'nicematin.png',
                        path: __dirname + '/../public/images/nicematin.png',
                        cid: 'logo'
                    }]
                };
                transporter.sendMail(mainOptions, (err, info)=> {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

module.exports = {
    sendEmail: sendEmail
};