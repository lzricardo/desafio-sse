const v1 = require('express').Router();

//Middlewares
const CheckCandidaturePayload = require('../app/middlewares/CheckCandidaturePayload');

//Controllers
const CandidatureController = require('../app/controllers/CandidatureController');

//Routes
v1.post('/candidatures', CheckCandidaturePayload, CandidatureController.store);

module.exports = v1;