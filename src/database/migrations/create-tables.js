
const createBudget = (queryInterface, DataTypes) => {
    return queryInterface.createTable('Budget', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    });
};

const createCategory = (queryInterface, DataTypes) => {
    return queryInterface.createTable('Category', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: DataTypes.STRING
    });
};

const createAccount = (queryInterface, DataTypes) => {
    return queryInterface.createTable('Account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        startingBalance: {
            type: DataTypes.NUMERIC(10, 2),
            allowNull: false
        },
        budgetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Budget',
                key: 'id'
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
            nullable: false
        },
        amount: {
            type: DataTypes.BIGINT,
            nullable: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
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
        return createBudget(queryInterface, DataTypes)
            .then(createCategory(queryInterface, DataTypes)
                .then(createAccount(queryInterface, DataTypes)
                    .then(createTransaction(queryInterface, DataTypes))));
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropAllTables();
    }
};