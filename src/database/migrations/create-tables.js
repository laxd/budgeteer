
const createBudget = (queryInterface, DataTypes) => {
    return queryInterface.createTable('Budget', {
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
};

const createCategory = (queryInterface, DataTypes) => {
    return queryInterface.createTable('Category', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

const createAccount = (queryInterface, DataTypes) => {
    return queryInterface.createTable('Account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        budgetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Budget',
                key: 'id'
            }
        }
    });
};

const createTransaction = (queryInterface, DataTypes) => {
    return queryInterface.createTable('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vendor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.ENUM,
            values: ["pending", "cleared", "reconciled"],
            defaultValue: false
        },
        accountId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Account',
                key: 'id'
            }
        }
    });
};

module.exports = {
    up: (queryInterface, DataTypes) => {
        return Promise.all([
            createBudget(queryInterface, DataTypes),
            createCategory(queryInterface, DataTypes),
            createAccount(queryInterface, DataTypes),
            createTransaction(queryInterface, DataTypes)
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropAllTables();
    }
};