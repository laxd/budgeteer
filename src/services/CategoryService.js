const {Category} = require('../database/models');
const logger = require('../loaders/logger');

module.exports = {

    createCategory: (category) => {
        logger.silly(`Creating category: ${category.name}`);
        return Category.build({
            name: category.name,
        }).save();
    },

    findCategory: (id) => {
        return Category.findOne({
            where: {
                id: id
            }
        });
    },

    findCategories: () => {
        return Category.findAll();
    },

    deleteCategory: (id) => {
        return Category.findOne({
            where: {
                id: id
            }
        }).then(category => {
            if(category) {
                category.destroy();
            }
        })
    }
};
