const supplementsData = require('../models/supplementsPressbookData');
const supplData = require('../models/supplData');
const editionData = require('../models/editionData');
const fabrData = require('../models/fabrData');
const origineData = require('../models/origineData');
const papierData = require('../models/papierData');
const produitData = require('../models/produitData');
const sourceData = require('../models/sourceData');
const moment = require('../moment-with-locales');

const createSupplement = async (req, res, infosConnectedUser, serviceUsers) => {
    try {
        let loginUser = infosConnectedUser.adresseMail.replace("@nicematin.fr", "");
        let item = {
            //date:  ,
            date : moment(),
            date_du_jour: moment().format('DD/MM/YYYY'),
            portage: req.body.portage,
            theme: req.body.theme,
            suppl: req.body.suppl,
            parution: req.body.parution,
            date_prod: req.body.dateProd,
            date_portage: req.body.datePortage,
            edition: req.body.edition,
            produit: req.body.produit,
            fabr: req.body.fabr,
            papier: req.body.papier,
            pagination: req.body.pagination,
            nb_quadri: req.body.nbQuadri,
            tap: req.body.tap,
            journaux: req.body.journaux,
            tirage_mini: req.body.tirageMin,
            origine: req.body.origine,
            source: req.body.source,
            observation: req.body.observation,
            option_reser: req.body.optionReser,
            login: loginUser,
            serviceUser: serviceUsers
        };
        let data = new supplementsData(item);
        await data.save();
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

const updateSupplement = async (req, res, infosConnectedUser, serviceUsers) => {
    try {
        let id = req.body.idSupp;
        let loginUser = infosConnectedUser.adresseMail.replace("@nicematin.fr", "");
        await supplementsData.findById(id, async (err, doc) => {
            if (err) {
                console.log("erreur");
            } else {
                doc.date = moment();
                doc.portage = req.body.portage;
                doc.theme = req.body.theme;
                doc.suppl = req.body.suppl;
                doc.parution = req.body.parution;
                doc.date_prod = req.body.dateProd;
                doc.date_portage = req.body.datePortage;
                doc.edition = req.body.edition;
                doc.produit = req.body.produit;
                doc.fabr = req.body.fabr;
                doc.papier = req.body.papier;
                doc.pagination = req.body.pagination;
                doc.nb_quadri = req.body.nbQuadri;
                doc.tap = req.body.tap;
                doc.journaux = req.body.journaux;
                doc.tirage_mini = req.body.tirageMin;
                doc.origine = req.body.origine;
                doc.source = req.body.source;
                doc.observation = req.body.observation;
                doc.option_reser = req.body.optionReser;
                doc.serviceUser = serviceUsers;
                doc.login = loginUser;
                await doc.save();
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


const deleteSupplement = async (req, res) => {
    try {
        let id = req.body.idSupp;
        await supplementsData.findByIdAndRemove(id).exec();
        res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};


const getDataSuppl = async (req, res) => {
    try {
        let doc = await supplData.find();
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

const getDataEdition = async (req, res) => {
    try {
        let doc = await editionData.find();
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


const getDataProduit = async (req, res) => {
    try {
        let doc = await produitData.find();
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

const getDataFabr = async (req, res) => {
    try {
        let doc = await fabrData.find();
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


const getDataPapier = async (req, res) => {
    try {
        let doc = await papierData.find();
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


const getDataOrigine = async (req, res) => {
    try {
        let doc = await origineData.find();
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


const getDataSource = async (req, res) => {
    try {
        let doc = await sourceData.find();
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



const getSupplementsEnCours = async (req, res) => {
    try {
        let doc = await supplementsData.find(
            {
                parution :{
                    $gte: moment().subtract(6, 'days')
                }
            }
        ).sort( { parution : 1 } );
            res.status(200).json({
                status: 'success',
                data: doc
            });
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};


const getSupplementsListe = async (req, res) => {
    try {
        console.log(req.body);
        let dateDebut = moment(req.body.dateDebut);
        let dateFin = (moment(req.body.dateFin).add(1, 'days'));

        const selectionDate = await supplementsData.find({
            parution: {
                $gte: dateDebut,
                $lt: dateFin
            }
        });
        console.log(selectionDate);
        res.status(200).json({
            status: 'success',
            data: selectionDate
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

const getSupplementId = async (req,res) =>{
    try {
        let doc = await supplementsData.findById(req.body.identifiant);
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
}

const getSupplementId2 = async (req) =>{
    try {
        let doc = await supplementsData.findById(req.body.identifiant)
            return doc;
         
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

module.exports = {
    createSupplement: createSupplement,
    updateSupplement : updateSupplement,
    deleteSupplement : deleteSupplement,

    getDataSuppl : getDataSuppl,
    getDataEdition: getDataEdition,
    getDataProduit: getDataProduit,
    getDataFabr: getDataFabr,
    getDataPapier : getDataPapier,
    getDataOrigine : getDataOrigine,
    getDataSource: getDataSource,

    getSupplementsEnCours : getSupplementsEnCours,
    getSupplementId : getSupplementId,
    getSupplementId2,getSupplementId2,
    getSupplementsListe : getSupplementsListe
};