const publihomeData = require('../models/publihomeData');
const tourneesData = require('../models/tourneesData');
const quantiteTourneesData = require('../models/quantiteTourneesData');
const moment = require('../moment-with-locales');


const createPublihome = async (req, res, infosConnectedUser, serviceUsers) => {
    try {
        let loginUser = infosConnectedUser.adresseMail.replace("@nicematin.fr", "");
        let item = {
            //date:  ,
            date : moment(),
            date_du_jour: moment().format('DD/MM/YYYY'),
            titre: req.body.titre,
            type : req.body.type,
            quantite_totale : req.body.quantiteTotale,
            date_portage : req.body.datePortage,
            poid : req.body.poid,
            nombres_pages : req.body.nombrePage,
            conditionnement : req.body.conditionnement,
            commentaire : req.body.commentaire,
            etat : req.body.etat,
            login: loginUser,
            serviceUser: serviceUsers
        };
        let data = new publihomeData(item);
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


const getPublihomeEnCours = async (req, res) => {
    try {
        let doc = await publihomeData.find(
            {
                date_portage :{
                    $gte: moment().subtract(6, 'days')
                }
            }
        ).sort( { date_portage : 1 } );
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


const getPublihomeId = async (req,res) =>{
    try {
        let doc = await publihomeData.findById(req.body.identifiant);
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

const getPublihomeId2 = async (id) =>{
    try {
        let doc = await publihomeData.findById(id);
            return doc;
    } catch (err) {
      console.log(err);
    }
};


const updatePublihome = async (req, res, infosConnectedUser, serviceUsers) => {
    try {
        let id = req.body.idSupp;
        let loginUser = infosConnectedUser.adresseMail.replace("@nicematin.fr", "");
        await publihomeData.findById(id, async (err, doc) => {
            if (err) {
                console.log("erreur");
            } else {
                doc.date = moment();
                doc.titre = req.body.titre;
                doc.type = req.body.type;
                doc.quantite_totale = req.body.quantiteTotale;
                doc.date_portage = req.body.datePortage;
                doc.poid = req.body.poid;
                doc.nombres_pages = req.body.nombrePage;
                doc.conditionnement = req.body.conditionnement;
                doc.commentaire = req.body.commentaire;
                doc.etat = req.body.etat;
                
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


const deletePublihome = async (req, res) => {
    try {
        let id = req.body.idSupp;
        await publihomeData.findByIdAndRemove(id).exec();
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


const updateTournees = async (req,res, infosConnectedUser, serviceUsers ) => {
    try {
        let id = req.body.idSupp;
        let loginUser = infosConnectedUser.adresseMail.replace("@nicematin.fr", "");
        await publihomeData.findById(id, async (err, doc) => {
            if (err) {
                console.log("erreur");
            } else {
                doc.id_tournee = req.body.tournee;
                doc.tournee = true;
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


const getListeTourneesPublihome = async (req,res) =>{
    
    try {
        let doc = await publihomeData.findById(req.body.id);
        let idTournee = doc.id_tournee;
        let listeTournee = await tourneesData.find({"_id": { "$in" : idTournee}});
        let jour = moment(doc.date_portage).format("dddd").toUpperCase();
        for(tournee of listeTournee){
            let quantite = await quantiteTourneesData.findOne({"CODTOUR" : tournee.num_tournee, "JOUR" : jour});
            if(quantite !== null){
                tournee.net = quantite.NBEXP ;
                tournee.net10 = Math.round((quantite.NBEXP)*1.1) ;
            }
            else{
                tournee.net = 0 ;
                tournee.net10 = 0 ;
            }
           // console.log(quantite.NBEXP);
        }
        res.status(200).json({
            status: 'success',
            data: listeTournee
        });
         
    } catch (err) {
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

const getListeTourneesPublihome2 = async (id) =>{
    
    try {
        let doc = await publihomeData.findById(id);
        let idTournee = doc.id_tournee;
        let listeTournee = await tourneesData.find({"_id": { "$in" : idTournee}});
        let jour = moment(doc.date_portage).format("dddd").toUpperCase();
        for(tournee of listeTournee){
            let quantite = await quantiteTourneesData.findOne({"CODTOUR" : tournee.num_tournee, "JOUR" : jour});
            if(quantite !== null){
                tournee.net = quantite.NBEXP ;
                tournee.net10 = Math.round((quantite.NBEXP)*1.1) ;
            }
            else{
                tournee.net = 0 ;
                tournee.net10 = 0 ;
            }
           // console.log(quantite.NBEXP);
        }
        return listeTournee;
         
    } catch (err) {
        console.log(err)
    }
}


const getPublihomeListe = async (req, res) => {
    try {
        let dateDebut = moment(req.body.dateDebut);
        let dateFin = (moment(req.body.dateFin).add(1, 'days'));

        const selectionDate = await publihomeData.find({
            date_portage: {
                $gte: dateDebut,
                $lt: dateFin
            }
        });
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

module.exports = {
    createPublihome : createPublihome,
    getPublihomeEnCours :getPublihomeEnCours,
    getPublihomeId :getPublihomeId,
    updatePublihome : updatePublihome,
    deletePublihome : deletePublihome,
    updateTournees : updateTournees,
    getListeTourneesPublihome :getListeTourneesPublihome,
    getPublihomeListe :getPublihomeListe,

    getPublihomeId2 : getPublihomeId2,
    getListeTourneesPublihome2 :getListeTourneesPublihome2
};