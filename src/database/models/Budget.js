module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define('Budget', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Budget.associate = (models) => {
        Budget.hasMany(models.Account);
    };

    Budget.prototype.toJson = function() {
        return {
            id: this.id,
            name: this.name,
            links: {
                self: `/budgets/${this.id}`,
                accounts: `/accounts?budgetId=${this.id}`
            }
        }
    };

    return Budget
};
