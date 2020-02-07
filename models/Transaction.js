module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vendor: {
            type: DataTypes.STRING,
            nullable: false
        },
        amount: {
            type: DataTypes.BIGINT,
            nullable: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        },
        cleared: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        reconciled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
};