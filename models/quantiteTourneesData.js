const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quantiteTourneesDataSchema = new Schema({
    CODTOUR : {type: String},
    DATETOUR : {type: String},
    JOUR : {type: String},
    NBEXP :{type: String}
}, {collection: 'quantite_tournees'});


module.exports = mongoose.model("quantiteTourneesDataSchema", quantiteTourneesDataSchema);
