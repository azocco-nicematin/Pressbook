const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const papierDataSchema = new Schema({
    nom: String
   }, {collection: 'papier'});


module.exports = mongoose.model("papierData", papierDataSchema);
