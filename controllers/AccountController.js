const { check, validationResult } = require('express-validator');

exports.validate = () => {
    return [
        check('name').not().isEmpty()
    ]
};

exports.get_all_accounts = (req, res) => {
    res.app.get('models').Account.findAll()
        .then(accounts => res.json(accounts));
};

exports.get_account = (req, res) => {
    res.app.get('models').Account
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(account => {
            if(account === null) {
                res.status(404)
                    .json("Not found");
            }
            else {
                res.status(200)
                    .json(account);
            }
        });
};

exports.create_account = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }
    res.app.get('models').Account
        .build({ name: req.body.name })
        .save()
        .then(account => {
            res.status(201)
                .json(account);
        })
};