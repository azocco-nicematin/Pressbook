const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const editionDataSchema = new Schema({
    nom: String
   }, {collection: 'editions'});


module.exports = mongoose.model("editionData", editionDataSchema);
