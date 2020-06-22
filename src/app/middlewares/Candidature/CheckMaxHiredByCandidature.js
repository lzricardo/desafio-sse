const {Candidature, Sequelize} = require('../../models');

module.exports = async (req, res, next) => {
    try {
        res.locals.Candidature = Candidature;

        let exceededPositions = [],
            hiredByPosition = new Map
        ;

        let candidaturesByPositionCount = await Candidature.findAll({
            attributes: ['position_name', [Sequelize.fn('COUNT', Sequelize.col('position_name')), 'count']],
            where: {
                position_name: {
                    [res.locals.Op.in]: res.locals.positions
                }
            },
            group: 'position_name',
            raw: true
        });

        candidaturesByPositionCount.forEach(candidaturesByPosition => {
            hiredByPosition.set(candidaturesByPosition.position_name, candidaturesByPosition.count);
        });

        res.locals.loadedPositions.forEach(position => {
            let position_name = position.name.trim();
            let countNewHired = res.locals.maxHiredByCandidature.get(position_name);
            let countHired = hiredByPosition.get(position.name) || 0;

            if (countNewHired + countHired > position.maxHired) {
                exceededPositions.push(position_name);
            }
        });

        if (exceededPositions.length) {
            return res.status(422).json(
                {
                    error: {
                        message: 'Max candidature by positions exceeded.',
                        positions: exceededPositions
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