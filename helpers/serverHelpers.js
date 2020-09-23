const getRemainingTime = (oauth2Client) => {
    let a = oauth2Client.credentials.expiry_date;
    a = (a - (a % 1000)) / 1000;
    const tokenExpires = new Date(a * 1000);
    const now = new Date();
    return (tokenExpires - now) / 1000;
};


const getUserInfos = async (service) => {
    try {
        const res = await service.people.get({
            resourceName: 'people/me',
            personFields: 'emailAddresses,names,photos,organizations',
        });
        return {
            nom: res.data.names[1].familyName,
            prenom: res.data.names[1].givenName,
            prenom_nom: res.data.names[1].displayName,
            adresseMail: res.data.emailAddresses[0].value,
            photo: res.data.photos[0].url,
            //service: "Expeditions",
            service: res.data.organizations[0].department,
            poste: res.data.organizations[0].title
        };
    } catch (e) {
        console.log(e);
    }
};

const serviceUser = async (service) => {
    try {
        let droitService;
        switch (service) {
            case "Maintenance Generale" :
            case "Mecanique" :
                droitService = "Maintenance";
                break;
            case "Impression"  :
                droitService = "Impression";
                break;
            case "Expeditions" :
                droitService = "Expedition";
                break;
            case "Etudes Developpement" :
            case "Systemes Exploitation" :
                droitService = "Admin";
                break;
            case "Direction Technique":
                droitService = "Direction";
                break;
            default :
                droitService = "null";
        }
        return droitService;
    } catch (e) {
        console.log(e);
    }
};



module.exports = {
    getUserInfos: getUserInfos,
    serviceUser: serviceUser,
    getRemainingTime: getRemainingTime
};