class ElasticSearchBulkOperationFailedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ElasticSearchBulkOperationFailedError';
        Error.captureStackTrace(this, ElasticSearchBulkOperationFailedError);
    }
}

module.exports = ElasticSearchBulkOperationFailedError;