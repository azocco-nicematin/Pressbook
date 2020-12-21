/*const cron = require('node-cron');
const csvtojson = require("csvtojson");
const quantiteTourneesData = require('../models/quantiteTourneesData');

// minutes heures
cron.schedule('30 05 * * *', () => {
    importCsv();
  });

const importCsv = async ()=>{
    let csvData = await csvtojson().fromFile("tmp_tournees.csv");
    await deleteQuantiteTournee();
    await createQuantiteTournee(csvData);
    console.log(csvData);
}


const deleteQuantiteTournee = async () => {
    try {
        await quantiteTourneesData.remove({}).exec();
    } catch (err) {
        console.log(err);
    }
};

const createQuantiteTournee = async (item) => {
    try {
        await quantiteTourneesData.insertMany(item).exec();
      
    } catch (err) {
        console.log(err);
    }
};
*/