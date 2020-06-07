const ErrorMessageHelper = require('../../helpers/error-message');
const RequestHelper = require('../../helpers/request');
const { Candidature } = require('../models');

class CandidatureController {
    store(req, res) {
        Candidature.bulkCreate(req.body, { validate: true, returning: true })
            .then(candidatures => {
                return res.status(200).json(candidatures);
            })
            .catch(errors => {
                return res.status(500).json(errors);
            });
    }
}

module.exports = new CandidatureController;