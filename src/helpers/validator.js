const Joi = require('@hapi/joi'),
    ValidatorRuleNotFoundError = require('../errors/ValidatorRuleNotFoundError')
;

class Validator {
    constructor() {
        this.schemas = this._initializeSchemas();
    }

    _initializeSchemas() {
        return [
            {
                [VALIDATOR_RULE_PAYLOAD_CANDIDATURE_KENOBY]: Joi.array().items(
                    Joi.object({
                        applicant_email: Joi.string().email().required(),
                        position_name: Joi.string().pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i).required(),
                        situation: Joi.string().valid('assessing', 'hired', 'incompatible').required()
                    }).required()
                ).required().min(1).max(parseInt(process.env.APP_CANDIDATURES_BATCH_MAX_SIZE)).unique((a, b) => (a.applicant_email === b.applicant_email && a.position_name === b.position_name))
            },
            {
                [VALIDATOR_RULE_QUERY_PARAM_CANDIDATURE_KENOBY]: Joi.object({
                    applicant_email: Joi.string().email(),
                    position_name: Joi.string().pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i),
                }).or('applicant_email', 'position_name').required()
            }
        ];
    }

    _findSchema(rule) {
        let result = this.schemas.filter(schema => {
            return schema.hasOwnProperty(rule)
        });

        if (result.length > 0) {
            return result[0][rule];
        } else {
            throw new ValidatorRuleNotFoundError('Rule not found');
        }
    }

    /**
     * Check if object is valid according with validator's rule. Returns 'false' para valid objects and 'true'
     * to invalid objects.
     *
     * Available rules:
     *
     * - VALIDATOR_RULE_PAYLOAD_CANDIDATURE_KENOBY
     *
     * @public
     * @throws {ValidatorRuleNotFoundError}
     * @param {string} rule The validator rule valid
     * @param {object} object Object JSON
     * @return {boolean} Validation's result
     */
    execute(rule, object) {
        let result = this._findSchema(rule).validate(object);

        if (result.hasOwnProperty('error')) {
            console.log(`[VALIDATOR] Object JSON invalid => rule: ${rule}, object: ${JSON.stringify(object)}, errors: ${result.error}`);

            return result.error;
        } else {
            return false;
        }
    }
}

module.exports = new Validator;