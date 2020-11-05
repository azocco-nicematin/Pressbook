const tourneesData = require('../models/tourneesData');
const quantiteTourneesData = require('../models/quantiteTourneesData');
const moment = require('../moment-with-locales');


const getListeConcordance = async (req,res) =>{

    try {
        let secteur = req.body.secteur;
        let listeTournee;
        if(secteur === "AM"){
            listeTournee = await tourneesData.find({"num_tournee" : /^A/});
        }
        else if (secteur === "VAR"){
            listeTournee = await tourneesData.find({"num_tournee" : /^V/});
        }
        else{
            res.status(404).json({
                status: 'fail'
            });
        }

        for(tournee of listeTournee){
            let quantite = await quantiteTourneesData.findOne({"CODTOUR" : tournee.num_tournee}).sort({"NBEXP":-1}).limit(1);
            if(quantite !== null){
                tournee.net = quantite.NBEXP ;
            }else{
                tournee.net = 0;
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
};


module.exports = {
    getListeConcordance : getListeConcordance
};
