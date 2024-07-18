require("dotenv/config");

module.exports = {
  development: {
    dialect: process.env.DB_DIALECT_DEV,
    host: process.env.DB_HOST_DEV,
    username: process.env.DB_USERNAME_DEV,
    port: process.env.DB_PORT_DEV,
    password: process.env.DB_PASSWORD_DEV,
    database: process.env.DB_NAME_DEV,
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
      freezeTableName: true,
    },
  },
  production: {
    dialect: process.env.DB_DIALECT_PROD,
    host: process.env.DB_HOST_PROD,
    username: process.env.DB_USERNAME_PROD,
    port: process.env.DB_PORT_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
      freezeTableName: true,
    },
  },
};
