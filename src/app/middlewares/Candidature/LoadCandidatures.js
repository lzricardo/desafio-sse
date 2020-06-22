module.exports = async (req, res, next) => {
    try {
        let {body} = await ElasticSearch.search({
            index: 'kenoby',
            body: {
                query: res.locals.search
            }
        });

        res.locals.candidatures = (body.hits.hits.length > 0) ?
            body.hits.hits.map(candidature => candidature._source) :
            []
        ;

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