module.exports = async (req, res, next) => {
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
        return res.status(422).json({ error: { message: '' } });
    }

    return next();
}