const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const origineDataSchema = new Schema({
    nom: String
   }, {collection: 'origine'});


module.exports = mongoose.model("origineData", origineDataSchema);
