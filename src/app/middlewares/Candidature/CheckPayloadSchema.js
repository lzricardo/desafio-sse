module.exports = (req, res, next) => {
    if (validator.execute(VALIDATOR_RULE_PAYLOAD_CANDIDATURE_KENOBY, req.body)) {
        return res.status(422).json({ error: { message: '' } });
    }

    return next();
}