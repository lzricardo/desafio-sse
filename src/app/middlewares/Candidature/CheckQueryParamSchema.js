module.exports = (req, res, next) => {
    try {
        const resultValidator = validator.execute(VALIDATOR_RULE_QUERY_PARAM_CANDIDATURE_KENOBY, req.query);

        if (resultValidator) {
            return res.status(422).json(
                {
                    error: {
                        message: 'Request query params schema invalid.',
                        validation: resultValidator.message
                    }
                }
            );
        }

        return next();
    } catch (e) {
        console.error(e);

        return res.status(500).json(
            {
                error: {
                    message: 'Server internal error. Contact the administrator.'
                }
            }
        );
    }
};