const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment');

const Schema = mongoose.Schema;

const supplementsPressbookDataSchema = new Schema({
    date: {type: Date, default: moment()},
    date_du_jour : String,
    dossier_fabrication: {type: Boolean, default: false},
    portage : {type: Boolean},
    theme : {type: String},
    suppl : {type: String},
    parution : {type: Date},
    date_prod : {type: Date},
    date_portage : {type: Date},
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

    date_dispo : {type: Date},
    faconage : {type: String},
    mise_sous_film : {type: String},
    contact_final : {type: String},
    mention_legale : {type: String},
    pages_montrer :{type: String},
    format :{type: String},
    source_docs : {type: String},
    date_reception : {type: Date},
    saisir_folio : {type: Boolean},
    epreuve_definitive : {type: Boolean},
    blancheur : {type: String},
    laize : {type: String},
    type_production : {type: String},
    remarque :{type: String},
    tout_quadri : {type: Boolean},
    depassant14 : {type: Boolean},
    routage :{type: String},
    date_enlevement : {type: Date},
    quantite_sous_film :{type: String},
    coiffe :{type: Boolean},
    nom_transporteur_1 : {type: String},
    nombre_exemplaire_1 : {type: String},
    quantite_adresse_1 : {type: String},
    nom_transporteur_2 : {type: String},
    nombre_exemplaire_2 : {type: String},
    quantite_adresse_2 : {type: String},
    nom_transporteur_3 : {type: String},
    nombre_exemplaire_3 : {type: String},
    quantite_adresse_3 : {type: String},
    nom_transporteur_4 : {type: String},
    nombre_exemplaire_4 : {type: String},
    quantite_adresse_4 : {type: String},
    nom_transporteur_5 : {type: String},
    nombre_exemplaire_5 : {type: String},
    quantite_adresse_5 : {type: String},

    statut: {type: String, default: 'ajouté'},
    login: {type: String},
    serviceUser: {type : String}
}, {collection: 'supplementsPressbook'});

supplementsPressbookDataSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("supplementsPressbookDataSchema", supplementsPressbookDataSchema);
