const { validationResult } = require('express-validator');
const ErrorMessageHelper = require('../../helpers/error-message');
const RequestHelper = require('../../helpers/request');
const { Candidature, sequelize } = require('../models');

class CandidatureController {
    async store(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let statusCode = 400;

            return res.status(statusCode).json(ErrorMessageHelper.process('RE', statusCode));
        }

        try {
            return sequelize.transaction(t => {
                return Candidature.create({

                }, {transaction: t});
            }).then(async candidature => {


                return res.status(200).json({

                });
            }).catch(err => {
                console.log('Rolled back database\'s operation');
                console.error(err);
            });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new CandidatureController;