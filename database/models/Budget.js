module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('Budget', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    });

    Budget.associate = (models) => {
        Budget.hasMany(models.Account);
    }

    return Budget
};
