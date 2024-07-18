/* eslint-disable import/no-extraneous-dependencies */
import Sequelize, { Model} from "sequelize";
import "dotenv/config";


class Documentos extends Model {
  static init(sequelize) {
    super.init(
      {
        emissora: Sequelize.STRING,
        descricao: Sequelize.STRING,
        numero: Sequelize.STRING,
        dataEmissao: Sequelize.DATE,
        dataValidade: Sequelize.DATE,
      },
      { sequelize }
    );
    return this
  }
  static associate(models){
    this.belongsTo(models.Requerentes, {
      foreignKey: "requerenteId",
      as: "requerente",
    });

    this.belongsTo(models.Pedidos, {
      foreignKey: "pedidoId",
      as: "pedido",
    });

    this.belongsTo(models.Ficheiros, {
      foreignKey: "anexoId",
      as: "anexo",
    });

    this.belongsTo(models.TipoDocumentos, {
      foreignKey: "tipoId",
      as: "tipo",

    });
  }
}
export default Documentos;
