const { Candidature, Sequelize } = require('../../models');

module.exports = async (req, res, next) => {
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
        let countNewHired = res.locals.maxHiredByCandidature.get(position.name);
        let countHired = hiredByPosition.get(position.name) || 0;

        if (countNewHired + countHired > position.maxHired) {
            exceededPositions.push(position.name);
        }
    });

    if (exceededPositions.length) {
        return res.status(422).json({ error: { message: '', positions: exceededPositions } });
    }

    return next();
}