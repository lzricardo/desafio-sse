const v1 = require('express').Router();

//Middlewares

//Candidature
const CheckPayloadSchema = require('../app/middlewares/Candidature/CheckPayloadSchema');
const CheckQueryParamSchema = require('../app/middlewares/Candidature/CheckQueryParamSchema');
const TransformerPayload = require('../app/middlewares/Candidature/TransformerPayload');
const LoadEntities = require('../app/middlewares/Candidature/LoadEntities');
const CheckEntitiesExist = require('../app/middlewares/Candidature/CheckEntitiesExist');
const CheckMaxHiredByCandidature = require('../app/middlewares/Candidature/CheckMaxHiredByCandidature');
const CheckDuplicatedCandidature = require('../app/middlewares/Candidature/CheckDuplicatedCandidature');
const SetupFilterElasticSearch = require('../app/middlewares/Candidature/SetupFilterElasticSearch');
const LoadCandidatures = require('../app/middlewares/Candidature/LoadCandidatures');

//Controllers
const CandidatureController = require('../app/controllers/CandidatureController');

//Routes

//Candidature resource
v1.route('/candidatures')
    .post([CheckPayloadSchema, TransformerPayload, LoadEntities, CheckEntitiesExist, CheckMaxHiredByCandidature, CheckDuplicatedCandidature, CandidatureController.store])
    .get([CheckQueryParamSchema, SetupFilterElasticSearch, LoadCandidatures, CandidatureController.index])
;

//Others resources here...

module.exports = v1;