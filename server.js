const express = require('express');
const { google } = require('googleapis');
const CONFIG = require('./config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('./moment-with-locales');
const https = require('https');
const fs = require('fs');


moment.locale('fr');

// ne pas effacer
// set NODE_TLS_REJECT_UNAUTHORIZED=0


const supplementsPressbookController = require('./controllers/supplementsPressbookController');
const parametrageElementsController = require('./controllers/parametrageElementsController');
const supplementsFabricationController = require('./controllers/supplementsFabricationController');
const publihomeController = require('./controllers/publihomeController');
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

    return res.redirect('/pressbook/saisie');

});


app.get('/pressbook/saisie', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }

    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('pressbook', { infoUser: droitUser });
    }
});

app.get('/pressbook/liste', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('pressbook_rapport', { infoUser: droitUser });
    }

});

app.get('/pressbook/saisie/dossier/id/:id', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('formulaireFabrication', { infoUser: droitUser, id: req.params.id });
    }
});

app.get('/publihome/saisie', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }

    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('publihome', { infoUser: droitUser });
    }
});

app.get('/publihome/liste', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }

    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('infolivraisonListe', { infoUser: droitUser });
    }
});

app.get('/publihome/saisie/liste/id/:id', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('listeTourneePublihome', { infoUser: droitUser, id: req.params.id });
    }
});



app.get('/configuration/elements', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('configuration_elements', { infoUser: droitUser });
    }
});

app.get('/configuration/tournees', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    const droitUser = { service: req.cookies.service, info: req.cookies.info, poste: req.cookies.poste };

    if (droitUser.service !== 'null') {
        return res.render('configuration_tournees', { infoUser: droitUser });
    }
});


//--------------------- Pressbook requette -------------------------------------
//saisie
app.post('/pressbook/saisie/req', async (req, res) => {
    if (!req.cookies.jwt) {
        return res.redirect('/');
    }
    await supplementsPressbookController.createSupplement(req, res, req.cookies.info, req.cookies.service);
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
    await pdfController.createPdf(req, res, data);
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
    console.log(req.body);
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
    console.log(req.body);
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
    console.log(req.body);
    await publihomeController.getPublihomeListe(req, res)
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
