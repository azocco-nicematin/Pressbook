const supplementsData = require('../models/supplementsPressbookData');
const moment = require('../moment-with-locales');

const updateFabrication = async (req, res, infosConnectedUser, serviceUsers) => {
    try {
        console.log(req.body);
        let id = req.body.idSupp;
        console.log(req.body);
        let loginUser = infosConnectedUser.adresseMail.replace("@nicematin.fr", "");
        await supplementsData.findById(id, function (err, doc) {
            if (err) {
                console.log("erreur");
            } else {
                doc.date = moment();
                doc.date_dispo = req.body.dateDispo;
                doc.faconage = req.body.faconage;
                doc.mise_sous_film = req.body.miseSousFilm;
                doc.contact_final = req.body.contactFinal;
                doc.mention_legale = req.body.mentionLegale;
                doc.pages_montrer = req.body.pageMontrer;
                doc.format = req.body.format;
                doc.source_docs = req.body.sourceDocs;
                doc.date_reception = req.body.dateReception;
                doc.saisir_folio = req.body.saisirFolio;
                doc.epreuve_definitive = req.body.epreuveDefinitive;
                doc.blancheur = req.body.blancheur;
                doc.laize = req.body.laize;
                doc.type_production = req.body.typeProduction;
                doc.remarque = req.body.remarque;
                doc.tout_quadri = req.body.toutQuadri;
                doc.depassant14 = req.body.depassant14;
                doc.routage = req.body.routage;
                doc.date_enlevement = req.body.dateEnlevement;
                doc.quantite_sous_film = req.body.quantiteSousFilm;
                doc.coiffe = req.body.coiffe;
                doc.nom_transporteur_1 = req.body.nomTransporteur1;
                doc.nombre_exemplaire_1 = req.body.nombreExemplaire1;
                doc.quantite_adresse_1 = req.body.quantiteAdresse1;
                doc.nom_transporteur_2 = req.body.nomTransporteur2;
                doc.nombre_exemplaire_2 = req.body.nombreExemplaire2;
                doc.quantite_adresse_2 = req.body.quantiteAdresse2;
                doc.nom_transporteur_3 = req.body.nomTransporteur3;
                doc.nombre_exemplaire_3 = req.body.nombreExemplaire3;
                doc.quantite_adresse_3 = req.body.quantiteAdresse3;
                doc.nom_transporteur_4 = req.body.nomTransporteur4;
                doc.nombre_exemplaire_4 = req.body.nombreExemplaire4;
                doc.quantite_adresse_4 = req.body.quantiteAdresse4;
                doc.nom_transporteur_5 = req.body.nomTransporteur5;
                doc.nombre_exemplaire_5 = req.body.nombreExemplaire5;
                doc.quantite_adresse_5 = req.body.quantiteAdresse5;
                
                doc.dossier_fabrication = true;
                doc.serviceUser = serviceUsers;
                doc.login = loginUser;
                doc.save();
            }
        });
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


/*const getFabrication = async (req, res) => {
    try {
        let doc = await supplementsData.find();
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
};*/



module.exports = {
    updateFabrication : updateFabrication,
   // getFabrication :getFabrication
};