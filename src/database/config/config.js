require('dotenv').config();

module.exports = {
    development: {
        dialect: "sqlite",
        storage: "data.sqlite3",
    },
    test: {
        dialect: "sqlite",
        storage: ":memory:"
    },
    production: {
        url: process.env.DB_URL,
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
};
