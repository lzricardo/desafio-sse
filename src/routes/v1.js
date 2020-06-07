const v1 = require('express').Router();

//Middlewares

//Candidature
const CheckPayloadSchema = require('../app/middlewares/Candidature/CheckPayloadSchema');

//Controllers
const CandidatureController = require('../app/controllers/CandidatureController');

//Routes
v1.post(
    '/candidatures',
    [
        CheckPayloadSchema,
        CandidatureController.store
    ]
);

module.exports = v1;