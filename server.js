const express = require('express');
const { google } = require('googleapis');
const CONFIG = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('./moment-with-locales');
const https = require('https');
const fs = require('fs');


moment.locale('fr');


const supplementsPressbookController = require('./controllers/supplementsPressbookController');
const parametrageElementsController = require('./controllers/parametrageElementsController');
const parametrageEmailController = require('./controllers/parametrageEmailController');
const supplementsFabricationController = require('./controllers/supplementsFabricationController');
const publihomeController = require('./controllers/publihomeController');
const concordanceController = require('./controllers/concordanceController');
const emailController = require('./controllers/emailController');
const pdfController = require('./controllers/pdfController');
const parametrageTourneesController = require('./controllers/parametrageTourneesController');
/* imports helpers */
const serverHelpers = require('./helpers/serverHelpers');


const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');


// mongodb://mongoAdmin:MongaNm2020@muroise.nicematin.ad:27017/mydb
mongoose.connect(CONFIG.dbConfig, {
    //mongoose.connect('mongodb://localhost:27017/suivi_de_prod', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const app = express();

//moteur de template
app.set('view engine', 'ejs');

// fichiers statiques
app.use(express.static('public'));

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

//Routes

app.get('/', async (req, res) => {
    return res.redirect('/login');
});

/** Page de login */
app.get('/login', async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        CONFIG.oauth2Credentials.client_id,
        CONFIG.oauth2Credentials.client_secret,
        CONFIG.oauth2Credentials.redirect_uris[0]
    );
    const loginLink = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: CONFIG.oauth2Credentials.scopes
    });
    return res.render('login', { loginLink: loginLink });
});

/** route qui renvoi le formulaire de connexion google */
app.get('/auth/google/', async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        CONFIG.oauth2Credentials.client_id,
        CONFIG.oauth2Credentials.client_secret,
        CONFIG.oauth2Credentials.redirect_uris[0]
    );
    if (req.query.error) {
        return res.redirect('/');
    } else {
        oauth2Client.getToken(req.query.code, async (err, token) => {
            if (err) {
                console.log(err);
                return res.redirect('/');
            }
            res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
            return res.redirect('/tmp');
        });
    }

});

/** route tampon pour paramétrer les cookies et récupérer les infos Google de l'utilisateur */
app.get('/tmp', async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(CONFIG.oauth2Credentials.client_id, CONFIG.oauth2Credentials.client_secret, CONFIG.oauth2Credentials.redirect_uris[0]);
    oauth2Client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
    if (Object.keys(oauth2Client.credentials).length === 0 || serverHelpers.getRemainingTime(oauth2Client) <= 300) {
        return res.redirect('/login');
    }
    const service = google.people({ version: 'v1', auth: oauth2Client });
    const infosConnectedUser = await serverHelpers.getUserInfos(service);

    const serviceConnecte = await serverHelpers.serviceUser(infosConnectedUser.service);
    const info = infosConnectedUser;
    res.cookie('service', serviceConnecte);
    res.cookie('info', info);
    console.log('connecté en tant que : ' + serviceConnecte);

    

    if (serviceConnecte === "Achat") {
        return res.redirect('/pressbook/saisie');
    } else if (serviceConnecte === "Communication") {
        return res.redirect('/publihome/saisie');
    } else if (serviceConnecte === "Transport") {
        return res.redirect('/publihome/liste');
    } else if (serviceConnecte === "Admin") {
        return res.redirect('/pressbook/saisie');
    } else if (serviceConnecte === "Impression") {
        return res.redirect('/pressbook/liste');
    } else {
        return res.redirect('/pressbook/saisie');
    }

});


app.get('/pressbook/saisie', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }

    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        (droitUser.service === "Achat" || droitUser.service === "Admin") ?
            res.render('pressbook', {infoUser: droitUser}) : res.render('error/page_404', {infoUser: droitUser});
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});

app.get('/pressbook/liste', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('pressbook_rapport', { infoUser: droitUser });
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }

});

app.get('/pressbook/saisie/dossier/id/:id', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('formulaireFabrication', { infoUser: droitUser, id: req.params.id });
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});

app.get('/publihome/saisie', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }

    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        (droitUser.service === "Achat" || droitUser.service === "Communication" || droitUser.service === "Admin") ?
            res.render('publihome', {infoUser: droitUser}) : res.render('error/page_404', {infoUser: droitUser});
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});

app.get('/publihome/liste', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }

    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('infolivraisonListe', { infoUser: droitUser });
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});

app.get('/publihome/liste/id/:id', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('listeTourneePublihome', { infoUser: droitUser, id: req.params.id });
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});


app.get('/concordance/am', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };
    if (droitUser.service !== 'null') {
        return res.render('concordance_am', { infoUser: droitUser });
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});

app.get('/concordance/var', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };
    if (droitUser.service !== 'null') {
        return res.render('concordance_var', { infoUser: droitUser });
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});


app.get('/configuration/elements', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        (droitUser.service === "Admin") ?
            res.render('configuration_elements', {infoUser: droitUser}) : res.render('error/page_404', {infoUser: droitUser});
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});

app.get('/configuration/tournees', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        (droitUser.service === "Admin") ?
            res.render('configuration_tournees', {infoUser: droitUser}) : res.render('error/page_404', {infoUser: droitUser});
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});

app.get('/configuration/email', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        (droitUser.service === "Admin") ?
            res.render('configuration_email', {infoUser: droitUser}) : res.render('error/page_404', {infoUser: droitUser});
    } else {
        res.render('error/page_404', {infoUser: droitUser});
    }
});

app.get('/deconnexion', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    res.clearCookie('jwt');
    return res.redirect('/');
});

//--------------------- Pressbook requette -------------------------------------
//saisie
app.post('/pressbook/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.createSupplement(req, res, req.cookies.info, req.cookies.service);
    const mailPressbook = "/mail_pressbook.ejs";
    const listeEmail = await parametrageEmailController.getEmailAutorise();
    const subjectIncident = "Nouveau suppléments";
    emailController.sendEmail(req, res, mailPressbook, listeEmail, subjectIncident, req.cookies.service);
});

app.put('/pressbook/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.updateSupplement(req, res, req.cookies.info, req.cookies.service);
});


app.delete('/pressbook/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.deleteSupplement(req, res, req.cookies.info, req.cookies.service);
});


app.post('/pressbook/saisie/req/id', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getSupplementId(req, res);
});


app.get('/pressbook/saisie/req/data', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getSupplementsEnCours(req, res);
});

//dossier Fabr

app.put('/pressbook/saisie/dossier/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsFabricationController.updateFabrication(req, res, req.cookies.info, req.cookies.service);
});

app.post('/pressbook/saisie/dossier/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getSupplementId(req, res);
});

app.post('/pressbook/saisie/pdf', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    let data = await supplementsPressbookController.getSupplementId2(req);
    data.date_enlevement_format = data.date_enlevement ? moment(data.date_enlevement, "YYYY-MM-DDTHH:mm:ss.sssZ").format('DD/MM/YYYY') : "";
    console.log(data.date_enlevement_format);
    data.parution_format = data.parution ? moment(data.parution, "YYYY-MM-DDTHH:mm:ss.sssZ").format('DD/MM/YYYY') : "";
    data.date_prod_format = data.date_prod ? moment(data.date_prod, "YYYY-MM-DDTHH:mm:ss.sssZ").format('DD/MM/YYYY'): "";
    data.date_dispo_format = data.date_dispo ? moment(data.date_dispo, "YYYY-MM-DDTHH:mm:ss.sssZ").format('DD/MM/YYYY') : "";
    data.date_reception_format = data.date_reception ? moment(data.date_reception, "YYYY-MM-DDTHH:mm:ss.sssZ").format('DD/MM/YYYY') : "";
    data.date_prod_format = data.date_prod ? moment(data.date_prod, "YYYY-MM-DDTHH:mm:ss.sssZ").format('DD/MM/YYYY') : "";
    await pdfController.createPdf(req, res, data , 'views/template/pdf.ejs', 'portrait', 'dossier.pdf');
});

app.get('/download', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    res.download('./dossier.pdf'); // Set disposition and send it.
});

//liste
app.post('/pressbook/liste/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getSupplementsListe(req,res);
});

//--------------------- Publihome requette -------------------------------------
//saisie
app.post('/publihome/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await publihomeController.createPublihome(req, res,  req.cookies.info, req.cookies.service)
});

app.put('/publihome/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await publihomeController.updatePublihome(req, res, req.cookies.info, req.cookies.service);
});

app.delete('/publihome/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await publihomeController.deletePublihome(req,res);
});

app.get('/publihome/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await publihomeController.getPublihomeEnCours(req,res);
});

app.post('/publihome/saisie/req/id', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await publihomeController.getPublihomeId(req, res);
});


app.post('/publihome/saisie/liste/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await publihomeController.getListeTourneesPublihome(req, res);
});

app.post('/publihome/liste/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await publihomeController.getPublihomeListe(req, res)
});

app.post('/publihome/coiffe', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    let dataPublihome = await publihomeController.getPublihomeId2(req.body.id);
    let dataTournee = await publihomeController.getListeTourneesPublihome2(req.body.id);
    dataPublihome.date_portage_format = moment(dataPublihome.date_portage, "YYYY-MM-DDTHH:mm:ss.sssZ").format('DD/MM/YYYY');
    let data= {dataPublihome : dataPublihome , dataTournee : dataTournee , paquet: req.body.paquet}
    await pdfController.createPdf(req, res, data , 'views/template/coiffes.ejs', 'landscape', 'coiffes.pdf');
});


app.get('/download/coiffe', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    res.download('./coiffes.pdf'); // Set disposition and send it.
});


//---------------------- concordance requette
app.post('/concordance/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await concordanceController.getListeConcordance(req,res);
});



//--------------------- configuration requette -------------------------------------
//tournee
app.post('/configuration/tournees/req/data', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageTourneesController.getParamTournees(req, res);
});

app.post('/configuration/tournees/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageTourneesController.createTournee(req, res, req.cookies.info, req.cookies.service);
});

app.delete('/configuration/tournees/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageTourneesController.deleteTournee(req, res);
});

app.put('/tournees/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/'); 
    }
    await publihomeController.updateTournees(req, res, req.cookies.info, req.cookies.service);
});


//elements
app.get('/configuration/elements/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageElementsController.getElements(req, res);
});

app.post('/configuration/elements/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageElementsController.createElement(req, res);
});

app.delete('/configuration/elements/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageElementsController.deleteElement(req, res);
});


app.post('/configuration/email/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageEmailController.createParamEmail(req, res);
});

app.get('/configuration/email/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageEmailController.getParamEmail(req, res);
});

app.put('/configuration/email/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageEmailController.updateParamEmail(req, res);
});

app.delete('/configuration/email/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageEmailController.deleteParamEmail(req, res);
});


// --------------------------------DATA-----------------------------------
app.get('/data/get-edition', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await parametrageTourneesController.getEditions(req, res);
});

app.get('/data/suppl', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getDataSuppl(req, res);
});

app.get('/data/edition', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getDataEdition(req, res);
});

app.get('/data/produit', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getDataProduit(req, res);
});

app.get('/data/fabr', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getDataFabr(req, res);
});

app.get('/data/papier', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getDataPapier(req, res);
});

app.get('/data/origine', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getDataOrigine(req, res);
});

app.get('/data/source', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.getDataSource(req, res);
});



https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: 'nmsdp'
}, app)
    .listen(443, "0.0.0.0");

module.exports = app; // pour les tests
