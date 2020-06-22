module.exports = (req, res, next) => {
    try {
        if (
            res.locals.applicants.length !== res.locals.loadedApplicants.length ||
            res.locals.positions.length !== res.locals.loadedPositions.length
        ) {
            return res.status(404).json(
                {
                    error: {
                        message: 'Applicants or positions not found.'
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