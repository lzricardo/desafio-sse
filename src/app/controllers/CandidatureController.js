class CandidatureController {
    store(req, res) {
        res.locals.Candidature.bulkCreate(req.body, {validate: true, returning: true})
            .then(candidatures => {
                return res.status(200).json(candidatures);
            })
            .catch(errors => {
                return res.status(500).json(errors);
            });
    }

    index(req, res) {
        return res.status(200).json();
    }
}

module.exports = new CandidatureController;