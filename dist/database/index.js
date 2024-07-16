"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _index = _interopRequireDefault(require("../app/models/index"));
var _promise = _interopRequireDefault(require("mysql2/promise"));
var _database = _interopRequireDefault(require("../config/database"));
require("dotenv/config");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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
      define
    } = process.env.NODE_ENV == "development" ? _database.default.development : _database.default.production;
    console.log(host, port, user, password, database);
    const connection = await _promise.default.createConnection({
      host,
      port,
      user,
      password
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    this.sequel = new _sequelize.default(database, user, password, {
      host,
      port,
      dialect: 'mysql',
      define
    });
    _index.default.map(model => model.init(this.sequel)).map(model => model?.associate && model.associate(this.sequel.models));
    this.sequel.authenticate().then(() => {
      console.log(`Conexão com o banco de dados ${process.env.DB_NAME_DEV} estabelecida com sucesso!.`);
    }).catch(err => {
      console.error(`Impossível se conectar no banco de dados ${process.env.DB_NAME_DEV}:`, err);
    });
  }
}
var _default = exports.default = new Database();