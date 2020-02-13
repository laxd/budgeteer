const { Sequelize } = require('sequelize');
const config = require('config');

const sequelize = new Sequelize({
    dialect: config.get('dbDialect'),
    storage: config.get('dbConnectionString')
});

const models = [
    'Account',
    'Budget',
    'Category',
    'Transaction'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function (m) {
    m.Account.hasMany(m.Transaction);
    m.Transaction.belongsTo(m.Account);

    m.Category.hasMany(m.Category, {
        foreignKey: 'parentCategory'
    });
    m.Category.belongsTo(m.Category);
})(module.exports);

sequelize.sync();

module.exports.sequelize = sequelize;