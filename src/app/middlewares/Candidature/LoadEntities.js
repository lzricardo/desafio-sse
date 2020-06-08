const { Position, Applicant, Op } = require('../../models');

module.exports = async (req, res, next) => {
    try {
        res.locals.Op = Op;

        res.locals.loadedApplicants = await Applicant.findAll({
            where: {
                email: {
                    [Op.in]: res.locals.applicants
                },
                status: 'active'
            }
        });

        res.locals.loadedPositions = await Position.findAll({
            where: {
                name: {
                    [Op.in]: res.locals.positions
                },
                status: 'active'
            }
        });
    } catch (e) {
        console.error(e);

        return res.status(500).json(e);
    }

    return next();
}