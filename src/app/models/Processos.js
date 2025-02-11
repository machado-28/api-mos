import FazesStatusDoPedidos from "./FazesStatusDoPedidos";
import PedidoFazes from "./PedidoFazes";

/* eslint-disable no-param-reassign */
const Sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");


class Processos extends Model {
  static init(sequelize) {
    super.init(
      {
        numero: Sequelize.STRING,

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
        consulado: Sequelize.STRING,
        funcao: Sequelize.STRING,
        submetidoPorId: DataTypes.INTEGER,
        statusId: DataTypes.INTEGER,

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
    ; this.belongsTo(models.TipoVistos, {
      foreignKey: "tipoVistoId",
      as: "tipoVisto",
    });
    this.hasMany(models.ProgressoProcessos, {
      foreignKey: "processoId",
      as: "progresso",
    });
    this.hasMany(models.ProcessoFases, {
      foreignKey: "processoId",
      as: "fases",
    });
    this.belongsTo(models.Usuarios, {
      foreignKey: "submetidoPorId",
      as: "submetidoPor",
    });
    this.belongsTo(models.StatusDeSteps, {
      foreignKey: "statusId",
      as: "status",
    });
  }
}
export default Processos;