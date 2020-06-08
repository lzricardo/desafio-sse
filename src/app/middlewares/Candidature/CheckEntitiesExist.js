module.exports = (req, res, next) => {
    if (
        res.locals.applicants.length !== res.locals.loadedApplicants.length ||
        res.locals.positions.length !== res.locals.loadedPositions.length
    ) {
        return res.status(422).json({ error: { message: '' } });
    }

    return next();
}