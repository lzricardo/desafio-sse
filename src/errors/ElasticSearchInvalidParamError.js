class ElasticSearchInvalidParamError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ElasticSearchInvalidParamError';
        Error.captureStackTrace(this, ElasticSearchInvalidParamError);
    }
}

module.exports = ElasticSearchInvalidParamError;