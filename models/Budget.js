module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Budget', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    });
};