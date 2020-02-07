const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
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