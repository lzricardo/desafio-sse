const {Client} = require('@elastic/elasticsearch'),
    ElasticSearchInvalidParamError = require('../errors/ElasticSearchInvalidParamError'),
    ElasticSearchRequiredParamError = require('../errors/ElasticSearchRequiredParamError'),
    ElasticSearchBulkOperationFailedError = require('../errors/ElasticSearchBulkOperationFailedError')
;

class ElasticSearchService {
    constructor() {
        this.client = new Client({node: `${process.env.ELASTIC_SEARCH_PROTOCOL}://${process.env.ELASTIC_SEARCH_HOST}:${process.env.ELASTIC_SEARCH_PORT}`});
    }

    async bulk(dataset, params) {
        if (process.env.NODE_ENV === 'test') {
            return;
        }

        if (!Array.isArray(dataset)) {
            throw new ElasticSearchInvalidParamError(`Expected an array to dataset param got ${typeof dataset}`);
        }

        this._validParams(params);

        const body = dataset.flatMap(doc => [{index: {_index: params.index}}, doc]);

        const {body: bulkResponse} = await this.client.bulk({refresh: true, body});

        if (bulkResponse.errors) {
            const erroredDocuments = [];
            // The items array has the same order of the dataset we just indexed.
            // The presence of the `error` key indicates that the operation
            // that we did for the document has failed.
            bulkResponse.items.forEach((action, i) => {
                const operation = Object.keys(action)[0];

                if (action[operation].error) {
                    erroredDocuments.push({
                        // If the status is 429 it means that you can retry the document,
                        // otherwise it's very likely a mapping error, and you should
                        // fix the document before to try it again.
                        status: action[operation].status,
                        error: action[operation].error,
                        operation: body[i * 2],
                        document: body[i * 2 + 1]
                    });
                }
            });

            console.log(erroredDocuments);
            throw new ElasticSearchBulkOperationFailedError(`Bulk operation failed to this documents => ${erroredDocuments}`);
        }

        const {body: count} = await this.client.count({index: params.index});

        return count;
    }

    async search(params) {
        this._validParams(params);

        return await this.client.search(params);
    }

    _validParams(params) {
        if (!params.index) {
            throw new ElasticSearchRequiredParamError('Expected index attribute into params object');
        }
    }
}

module.exports = new ElasticSearchService;