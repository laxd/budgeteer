module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
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

    Account.associate = function(models) {
        Account.Transactions = Account.hasMany(models.Transaction);
        Account.Budget = Account.belongsTo(models.Budget);
    };

    Account.prototype.toJson = function() {
        return {
            id: this.id,
            name: this.name,
            balance: this.balance,
            links: {
                self: `/accounts/${this.id}`,
                transactions: `/transactions?accountId=${this.id}`
            }
        }
    };

    return Account;
};
