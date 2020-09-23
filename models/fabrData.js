const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fabrDataSchema = new Schema({
    nom: String
   }, {collection: 'fabrication'});


module.exports = mongoose.model("fabrData", fabrDataSchema);
