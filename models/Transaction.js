module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Transaction', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        vendor: DataTypes.STRING,
        amount: DataTypes.BIGINT,
        date: DataTypes.DATE,
        cleared: DataTypes.BOOLEAN,
        reconciled: DataTypes.BOOLEAN
    });
};