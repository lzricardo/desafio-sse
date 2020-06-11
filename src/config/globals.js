const RequireResilient = require('../helpers/require-resilient'),
      ElasticSearchService = RequireResilient('../services/elastic-search')

;

global.RequireResilient = RequireResilient;
global.ElasticSearch = ElasticSearchService;