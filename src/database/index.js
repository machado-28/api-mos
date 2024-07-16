import Sequelize from "sequelize";
import models from "../app/models/index";
import mysql from "mysql2/promise";
import databaseConfig from "../config/database";
import "dotenv/config";

class Database {
  constructor() {
    this.init();
  }

  async init() {
    const {
      host,
      port,
      username: user,
      dialect,
      password,
      database,
      define,
    } = process.env.NODE_ENV == "development"
        ? databaseConfig.development
        : databaseConfig.production;
    console.log(host, port, user, password, database);
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    this.sequel = new Sequelize(database, user, password, {
      host,
      port,
      dialect: 'mysql',
      define,
    });
    models
      .map((model) => model.init(this.sequel))
      .map((model) => model?.associate && model.associate(this.sequel.models));

    this.sequel
      .authenticate()
      .then(() => {
        console.log(
          `Conexão com o banco de dados ${process.env.DB_NAME_DEV} estabelecida com sucesso!.`
        );
      })
      .catch((err) => {
        console.error(
          `Impossível se conectar no banco de dados ${process.env.DB_NAME_DEV}:`,
          err
        );
      });
  }
}
export default new Database();
