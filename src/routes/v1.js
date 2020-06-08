const v1 = require('express').Router();

//Middlewares

//Candidature
const CheckPayloadSchema = require('../app/middlewares/Candidature/CheckPayloadSchema');
const TransformerPayload = require('../app/middlewares/Candidature/TransformerPayload');
const LoadEntities = require('../app/middlewares/Candidature/LoadEntities');
const CheckEntitiesExist = require('../app/middlewares/Candidature/CheckEntitiesExist');
const CheckMaxHiredByCandidature = require('../app/middlewares/Candidature/CheckMaxHiredByCandidature');
const CheckDuplicatedCandidature = require('../app/middlewares/Candidature/CheckDuplicatedCandidature');

//Controllers
const CandidatureController = require('../app/controllers/CandidatureController');

//Routes
v1.post(
    '/candidatures',
    [
        CheckPayloadSchema,
        TransformerPayload,
        LoadEntities,
        CheckEntitiesExist,
        CheckMaxHiredByCandidature,
        CheckDuplicatedCandidature,
        CandidatureController.store
    ]
);

module.exports = v1;