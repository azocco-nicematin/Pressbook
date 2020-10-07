const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment');

const Schema = mongoose.Schema;

const publihomeDataSchema = new Schema({
    date: {type: Date, default: moment()},
    date_du_jour : String,
    titre : {type: String},
    type : {type: String},
    quantite_totale : {type: String},
    date_portage :{type: Date},
    poid :{type: String},
    nombres_pages :{type: String},
    conditionnement :{type: String},
    commentaire :{type: String},
    etat : {type: String},
    statut: {type: String, default: 'ajouté'},
    tournee : {type: Boolean, default: false},
    id_tournee : [],
    login: {type: String},
    serviceUser: {type : String}
}, {collection: 'publihome'});

publihomeDataSchema.plugin(AutoIncrement, {inc_field: 'idPublihome'});

module.exports = mongoose.model("publihomeDataSchema", publihomeDataSchema);
