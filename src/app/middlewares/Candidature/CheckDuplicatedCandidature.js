module.exports = async (req, res, next) => {
    try {
        let duplicatedCandidatures = await res.locals.Candidature.findAll({
            where: {
                applicant_email: {
                    [res.locals.Op.in]: res.locals.applicants
                },
                position_name: {
                    [res.locals.Op.in]: res.locals.positions
                }
            }
        });

        if (duplicatedCandidatures.length) {
            return res.status(422).json(
                {
                    error: {
                        message: 'Duplicated candidature(s) exists.'
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
}