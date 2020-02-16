module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        startingBalance: {
            type: DataTypes.NUMERIC(10, 2),
            allowNull: false
        }
    });

    Account.associate = function(models) {
        Account.hasMany(models.Transaction);
        Account.belongsTo(models.Budget);
    };

    Account.toJson = (account) => {
        return {
            id: account.id,
            name: account.name,
            links: {
                self: `/accounts/${account.id}`,
                transactions: `/transactions?accountId=${account.id}`
            }
        }
    };

    return Account;
};
