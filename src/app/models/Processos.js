import FazesStatusDoPedidos from "./FazesStatusDoPedidos";
import PedidoFazes from "./PedidoFazes";

/* eslint-disable no-param-reassign */
const Sequelize = require("sequelize");
const { Model } = require("sequelize");


class Processos extends Model {
  static init(sequelize) {
    super.init(
      {
        numero: Sequelize.STRING,
        descricao: Sequelize.STRING,
        requerente: Sequelize.STRING,
        dataNascimento: Sequelize.DATE,
        mob: Sequelize.DATE,
        genero: Sequelize.STRING,
        estadoCivil: Sequelize.STRING,
        nacionalidade: Sequelize.STRING,
        nomePai: Sequelize.STRING,
        nomeMae: Sequelize.STRING,
        maeNacionalidade: Sequelize.STRING,
        paiNacionalidade: Sequelize.STRING,
        passaporteNumero: Sequelize.STRING,
        passaporteDataValidade: Sequelize.DATE,
        passaporteDataEmissao: Sequelize.DATE,
        passaporteEmissora: Sequelize.STRING,
        sindicato: Sequelize.STRING,
        funcao: Sequelize.STRING,

      },
      { sequelize }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Clientes, {
      foreignKey: "clienteId",
      as: "cliente",
    });

    // this.belongsTo(models.TipoPedidos, {
    //   foreignKey: "tipoId",
    //   as: "tipoPedido",
    // });

    // this.belongsTo(models.TipoVistos, {
    //   foreignKey: "tipoVistoId",
    //   as: "tipoVisto",
    // });

    this.belongsTo(models.Tecnicos, {
      foreignKey: "beneficiarioId",
      as: "beneficiario",
    });

    this.belongsTo(models.Projectos, {
      foreignKey: "projectoId",
      as: "projecto",
    }); this.belongsTo(models.TipoPedidos, {
      foreignKey: "tipoId",
      as: "tipo",
    });
  }
}
export default Processos;