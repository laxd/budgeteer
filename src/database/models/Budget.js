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
    };

    Budget.toJson = (budget) => {
        return {
            id: budget.id,
            name: budget.name,
            links: {
                self: `/budgets/${budget.id}`
            }
        }
    };

    return Budget
};
