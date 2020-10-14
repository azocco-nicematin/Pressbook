const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emailDataSchema = new Schema({
    nom: String,
    prenom: String,
    email: String
}, {collection: 'emails'});


module.exports = mongoose.model("emailData", emailDataSchema);