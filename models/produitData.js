const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const produitDataSchema = new Schema({
    nom: String
   }, {collection: 'produit'});


module.exports = mongoose.model("produitData", produitDataSchema);
