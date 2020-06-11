module.exports = (req, res, next) => {
    try {
        let positions = [],
            applicants = [],
            maxHiredByCandidature = new Map
        ;

        req.body.forEach(candidature => {
            if (positions.indexOf(candidature.position_name) === -1) {
                positions.push(candidature.position_name);
            }

            if (applicants.indexOf(candidature.applicant_email) === -1) {
                applicants.push(candidature.applicant_email);
            }

            if (maxHiredByCandidature.get(candidature.position_name)) {
                maxHiredByCandidature.set(candidature.position_name, (maxHiredByCandidature.get(candidature.position_name) + 1));
            } else {
                maxHiredByCandidature.set(candidature.position_name, 1);
            }
        });

        res.locals.positions = positions;
        res.locals.applicants = applicants;
        res.locals.maxHiredByCandidature = maxHiredByCandidature;

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