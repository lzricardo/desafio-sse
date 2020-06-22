module.exports = (req, res, next) => {
    try {
        const query = req.query;

        let search = {bool: {}};

        if (query.applicant_email) {
            search.bool = Object.assign(search.bool, {
                filter: {
                    term: {
                        applicant_email: query.applicant_email
                    }
                }
            });
        }

        if (query.position_name) {
            search.bool = Object.assign(search.bool, {
                must: {
                    match: {
                        position_name: query.position_name
                    }
                }
            });
        }

        res.locals.search = search;

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