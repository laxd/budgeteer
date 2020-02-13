module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    });

    Account.associate = function(models) {
        Account.hasMany(models.Transaction);
        Account.belongsTo(models.Budget);
    };

    return Account;
};
