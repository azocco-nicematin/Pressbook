const tourneesData = require('../models/tourneesData');
const editionsTourneesData = require('../models/editionsTourneesData');
const moment = require('../moment-with-locales');



const getEditions = async (req, res) => {
    try {
        let doc = await editionsTourneesData.find();
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

const getParamTournees = async (req, res) => {
    try {
        let doc = await tourneesData.find({ edition: req.body.edition });
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


const createTournee = async (req, res, infosConnectedUser, serviceUsers) => {
    try {
        let loginUser = infosConnectedUser.adresseMail.replace("@nicematin.fr", "");
        let item = {
            num_tournee: req.body.numTournee,
            nom_tournee: req.body.nomTournee,
            edition: req.body.edition,
            secteur: req.body.secteur,
            routage: req.body.routage,
            lieu_depot : req.body.lieuDepot,
            manager : req.body.manager,

            login: loginUser,
            serviceUser: serviceUsers

        };
        let data = new tourneesData(item);
        await data.save();
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


const deleteTournee = async (req, res) => {
    try {
        await tourneesData.deleteOne({
            num_tournee: req.body.numTournee,
            nom_tournee: req.body.nomTournee,
            edition: req.body.edition,
            secteur: req.body.secteur,
            routage: req.body.routage,
            lieu_depot : req.body.lieuDepot,
            manager : req.body.manager 
        });
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


module.exports = {
    getEditions : getEditions,
    getParamTournees : getParamTournees,
    createTournee : createTournee,
    deleteTournee :deleteTournee
};