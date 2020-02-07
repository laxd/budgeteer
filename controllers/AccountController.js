const { check, validationResult } = require('express-validator');

const getUrl = function (req) {
    return req.protocol + '://' + req.get('host') + "/accounts";
};

exports.validate = () => {
    return [
        check('name').not().isEmpty()
    ]
};

exports.get_all_accounts = (req, res) => {
    res.app.get('models').Account
        .findAll()
        .then(accounts => {
            res.status(200)
                .json({
                    count: accounts.length,
                    budgets: accounts.map(account => {
                        return {
                            id: account.id,
                            name: account.name,
                            request: {
                                method: "GET",
                                url: getUrl(req) + "/" + account.id
                            }
                        }
                    })
                });
        })
        .catch(error => {
            res.status(500)
                .json({ error: error.message });
        });;
};

exports.get_account = (req, res) => {
    res.app.get('models').Account
        .findOne({
            where: {
                id: req.params.id
            }
        })
        .then(account => {
            if(account) {
                res.status(200)
                    .json(account);
            }
            else {
                res.status(404)
                    .json("Not found");
            }
        })
        .catch(error => {
            res.status(500)
                .json({ error: error.message });
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
            res.status(200)
                .json({
                    id: account.id,
                    name: account.name,
                    request: {
                        method: "GET",
                        url: getUrl(req) + "/" + account.id
                    }
                });
        })
        .catch(error => {
            res.status(500)
                .json({ error: error.message });
        });
};