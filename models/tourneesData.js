const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

const tourneeDataSchema = new Schema({
    num_tournee : {type: String},
    nom_tournee : {type: String},
    edition : {type: String},
    secteur :{type: String},
    routage :{type: String},
    lieu_depot :{type: String},
    manager :{type: String},
    net :{type: String},
    net10 :{type: String},
    ilot : {type: String},
    
    login: {type: String},
    serviceUser: {type : String}
}, {collection: 'tournees'});


module.exports = mongoose.model("tourneeDataSchema", tourneeDataSchema);
