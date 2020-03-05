const { check, validationResult } = require('express-validator');
const categoryService = require('../../services/CategoryService');
const logger = require('../../loaders/logger');

exports.validate = () => {
    return [
        check('name').not().isEmpty(),
    ]
};

exports.get_all_categories = async (req, res, next) => {
    const categories = await categoryService.findCategories();

    res.status(200)
        .json(categories.map(category => category.toJson()));
};

exports.get_category = async (req, res, next) => {
    const category = await categoryService.findCategory(req.params.id);

    if(category) {
        res.status(200)
            .json(category.toJson());
    }
    else {
        res.status(404).json({
            message: "Not found"
        });
    }
};

exports.create_category = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422)
            .json({ errors: errors.array() });
    }

    const category = await categoryService.createCategory(req.body);

    res.status(200)
        .json(category.toJson());
};

exports.delete_category = (req, res, next) => {
    categoryService.deleteCategory(req.params.id)
        .then(() => {
            res.status(200).json({
                status: "Success",
                message: "Category deleted"
            });
        }).catch(error => next(error))
};