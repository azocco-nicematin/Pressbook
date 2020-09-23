const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sourceDataSchema = new Schema({
    nom: String
   }, {collection: 'source'});


module.exports = mongoose.model("sourceData", sourceDataSchema);
