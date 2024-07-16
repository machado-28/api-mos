/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { INTEGER, Model, NUMBER } from "sequelize";
import "dotenv/config";
import ProjectosTipoVistos from "./ProjectosTipoVistos";


class Projectos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      { sequelize }
    );
    return this
  }
  static associate(models) {
    this.hasMany(models.Processos, {
      foreignKey: "projectoId",
      as: "processo",
    });

    this.belongsTo(models.Clientes, {
      foreignKey: "clienteId",
      as: "cliente",
    });
    this.belongsTo(models.Usuarios, {
      foreignKey: "gestorInternoId",
      as: "gestorInterno",
    });
    this.belongsTo(models.Usuarios, {
      foreignKey: "gestorExternoId",
      as: "gestorExterno",
    });
  }
}
export default Projectos;
