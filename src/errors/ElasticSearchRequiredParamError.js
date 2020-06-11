class ElasticSearchRequiredParamError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ElasticSearchRequiredParamError';
        Error.captureStackTrace(this, ElasticSearchRequiredParamError);
    }
}

module.exports = ElasticSearchRequiredParamError;