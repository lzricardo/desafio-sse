class ValidatorRuleNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidatorRuleNotFoundError';
        Error.captureStackTrace(this, ValidatorRuleNotFoundError);
    }
}

module.exports = ValidatorRuleNotFoundError;