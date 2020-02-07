module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Budget', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: DataTypes.STRING
    });
};