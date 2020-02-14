module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Category', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: DataTypes.STRING
    });
};