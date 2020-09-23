const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment');

const Schema = mongoose.Schema;

const supplementsPressbookDataSchema = new Schema({
    date: {type: Date, default: moment(new Date()).add(2, 'h')},
    date_du_jour : String,
    dossier_fabrication: {type: Boolean, default: false},
    portage : {type: Boolean},
    theme : {type: String},
    suppl : {type: String},
    parution : {type: String},
    date_prod : {type: String},
    date_portage : {type: String},
    edition : {type: String},
    produit : {type: String},
    fabr : {type: String},
    papier : {type: String},
    pagination : {type: String},
    nb_quadri : {type: String},
    tap : {type: String},
    journaux : {type: String},
    tirage_mini : {type: String},
    origine : {type: String},
    source : {type: String},
    observation : {type: String},
    option_reser : {type: String},

    statut: {type: String, default: 'ajouté'},
    login: {type: String},
    serviceUser: {type : String}
}, {collection: 'supplementsPressbook'});

supplementsPressbookDataSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("supplementsPressbookDataSchema", supplementsPressbookDataSchema);
