const port = 443;
const baseURL = `https://localhost:${port}`;
const admin = "Admin";
const achat = "Achat";
const communication = "Communication";
const impression = "Impression";
const transport = "Transport";
const cadre = "Cadre";
module.exports = {
    JWTsecret: 'mysecret',
    baseURL: baseURL,
    port: port,
    admin: admin,
    achat: achat,
    communication: communication,
    impression: impression,
    transport: transport,
    cadre: cadre,
//    dbConfig: "mongodb://mongoAdmin:MongaNm2020@muroise.nicematin.ad:27017/pressbook?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
//dbConfig: "mongodb://sdp:sDp1dB2020Kl0gY@cocofesses:27017/suivi_de_prod?authSource=suivi_de_prod&readPreference=primary&appname=MongoDB%20Compass&ssl=false",  
//dbConfig: "mongodb://mongoAdmin:MongaNm2020@muroise.nicematin.ad:27017/pressbook?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    dbConfig: "mongodb://localhost:27017/pressbook?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false",
    oauth2Credentials: {
        client_id: "73978724420-3hpd2tljeepqfu1e125ir9ibp775ohj5.apps.googleusercontent.com",
        project_id: "key-reference-273714", // The name of your project
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_secret: "rr9y2pkXJJp8XSDKZGtHl-RD",
        redirect_uris: [
            `${baseURL}/auth/google`
        ],
        scopes: [
            'https://www.googleapis.com/auth/user.organization.read',
            'profile',
            'email'
        ]
    },
    mailCredentials: {
        host: 'smtp-relay.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        tls: {
            rejectUnauthorized: false
        }
    },
    chartColors: { // couleurs dashboard
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    }
};


