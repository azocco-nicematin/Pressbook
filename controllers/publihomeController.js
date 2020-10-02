const publihomeData = require('../models/publihomeData');
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


module.exports = {
    createPublihome : createPublihome,
    getPublihomeEnCours :getPublihomeEnCours
};