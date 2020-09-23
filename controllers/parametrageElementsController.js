const supplData = require('../models/supplData');
const editionData = require('../models/editionData');
const fabrData = require('../models/fabrData');
const origineData = require('../models/origineData');
const papierData = require('../models/papierData');
const produitData = require('../models/produitData');
const sourceData = require('../models/sourceData');


const getElements = async (req, res) => {

    try {

        let doc = {
            supplData: await supplData.find(),
            editionData: await editionData.find(),
            fabrData: await fabrData.find(),
            origineData: await origineData.find(),
            papierData: await papierData.find(),
            produitData: await produitData.find(),
            sourceData: await sourceData.find()
        }

        res.status(200).json({
            status: 'success',
            data: doc,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};


const createElement = async (req, res) => {

    try {
        let item = {
            nom: req.body.elem
        };
        let data;
        switch (req.body.idTab) {
            case "supplData":
                data = new supplData(item);
                break;
            case "editionData":
                data = new editionData(item);
                break;
            case "produitData":
                data = new produitData(item);
                break;
            case "fabrData":
                data = new fabrData(item);
                break;
            case "papierData":
                data = new papierData(item);
                break;
            case "origineData":
                data = new origineData(item);
                break;
            case "sourceData":
                data = new sourceData(item);
                break;
        }

        await data.save();
        res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

const deleteElement = async (req, res) => {
    try {
        let id = req.body.id;
        switch (req.body.idTab) {
            case "supplData":
                await supplData.findByIdAndRemove(id).exec();
                break;
            case "editionData":
                await editionData.findByIdAndRemove(id).exec();
                break;
            case "produitData":
                await produitData.findByIdAndRemove(id).exec();
                break;
            case "fabrData":
                await fabrData.findByIdAndRemove(id).exec();
                break;
            case "papierData":
                await papierData.findByIdAndRemove(id).exec();
                break;
            case "origineData":
                await origineData.findByIdAndRemove(id).exec();
                break;
            case "sourceData":
                await sourceData.findByIdAndRemove(id).exec();
                break;
        }

        res.status(200).json({
            status: 'success'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};




module.exports = {
    getElements: getElements,
    createElement: createElement,
    deleteElement: deleteElement
};