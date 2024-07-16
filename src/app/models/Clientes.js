/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";

class Clientes extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        telefone1: Sequelize.STRING,
        telefone2: Sequelize.STRING,
        provincia: Sequelize.STRING,
        municipio: Sequelize.STRING,
        comuna: Sequelize.STRING,
        cidade: Sequelize.STRING,
        site: Sequelize.STRING,
        nomeEmpresa: Sequelize.STRING,
        nif: Sequelize.STRING,
        ramo: Sequelize.STRING,
        activo: Sequelize.BOOLEAN
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.hasMany(models.Projectos, {
      foreignKey: "clienteId",
      as: "projectos",
    });
    this.hasMany(models.Processos, {
      foreignKey: "clienteId",
      as: "processos",
    });
    // this.hasMany(models.Tecnicos, {
    //   foreignKey: "clienteId",
    //   as: "tecnicos",
    // });








  }
}
export default Clientes;
