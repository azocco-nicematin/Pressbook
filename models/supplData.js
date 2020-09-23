const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supplDataSchema = new Schema({
    nom: String
   }, {collection: 'supplements'});


module.exports = mongoose.model("supplData", supplDataSchema);
