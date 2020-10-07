const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const editionsTourneesDataSchema = new Schema({
    nom: String
   }, {collection: 'editions_tournees'});


module.exports = mongoose.model("editionsTourneesData", editionsTourneesDataSchema);
