/**
 * Controller pour gérer l'envoi et le paramétrage de mails lors d'une clôture
 * @module parametrageEmailController
 */

const EmailData = require('../models/emailData');


const getParamEmail = async (req, res) => {
    try {
        let doc = await EmailData.find();
        res.status(200).json({
            status: 'success',
            data: doc
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

/**
 * Création d'un mail
 * @param {*} req 
 * @param {*} res 
 */
const createParamEmail = async (req, res) => {
    try {
        let item = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email
        };
        let data = new EmailData(item);
        await data.save();
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

/**
 * Modification des paramètres d'un mail
 */

const updateParamEmail = async (req, res) => {
    try {
        let id = req.body.id;
        await EmailData.findById(id, function (err, doc) {
            if (err) {
                console.log("erreur");
                res.status(400).json({
                    status: 'fail'
                });
            } else {
                doc.nom = req.body.nom;
                doc.prenom = req.body.prenom;
                doc.email = req.body.email;
                doc.save();
                res.status(200).json({
                    status: 'success'
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

/** Suppression d'un mail côté DB (et suppression d'une ligne côté front*/

const deleteParamEmail = async (req, res) => {
    try {
        let id = req.body.id;
        await EmailData.findByIdAndRemove(id).exec();
        res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const getEmailAutorise = async () => {
    try {
        let doc = await EmailData.find().select({ email: 1 });
        const listeEmail = [];
        doc.forEach(function (data) {
            listeEmail.push(data.email);
        });
        return listeEmail;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    getParamEmail: getParamEmail,
    updateParamEmail: updateParamEmail,
    createParamEmail: createParamEmail,
    deleteParamEmail: deleteParamEmail,
    getEmailAutorise : getEmailAutorise
};