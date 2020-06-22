const RequireResilient = require('../helpers/require-resilient'),
    ElasticSearchService = RequireResilient('../services/elastic-search')
;

global.RequireResilient = RequireResilient;
/**
 *
 * @type {ElasticSearchService}
 */
global.ElasticSearch = ElasticSearchService;