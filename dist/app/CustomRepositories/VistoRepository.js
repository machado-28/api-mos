"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Vistos = _interopRequireDefault(require("../models/Vistos"));
var _dateFns = require("date-fns");
var _sequelize = require("sequelize");
var _apiErrors = require("../helpers/api-errors");
var _Ficheiros = _interopRequireDefault(require("../models/Ficheiros"));
var _Pedidos = _interopRequireDefault(require("../models/Pedidos"));
var _Requerentes = _interopRequireDefault(require("../models/Requerentes"));
var _TipoVistos = _interopRequireDefault(require("../models/TipoVistos"));
var _StatusDeVistos = _interopRequireDefault(require("../models/StatusDeVistos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class VistoRepository {
  async create({
    numero,
    tipoId,
    processoId,
    dataValidade,
    dataEmissao,
    anexoId
  }) {
    const vistoJaEmitido = await this.validadeByNumero({
      numero
    });
    if (vistoJaEmitido) {
      throw new _apiErrors.UnAuthoriazedError("Este Visto Ja foi Emitido");
    }
    const visto = await _Vistos.default.create({
      numero,
      tipoId,
      processoId,
      dataValidade,
      anexoId,
      dataEmissao,
      dataValidade
    });
    return true;
  }
  async update({
    numero,
    dataValidade,
    anexoId,
    dataEmissao
  }) {
    const isValid = await this.validadeByNumero({
      numero
    });
    if (!isValid) {
      throw new _apiErrors.NotFoundError("Visto invalido");
    }
    const visto = await this.getByNumero({
      numero
    });
    await visto.update({
      dataValidade,
      dataEmissao,
      anexoId
    });
    return true;
  }
  async getAll() {
    const {
      count: total,
      rows: vistos
    } = await _Vistos.default.findAndCountAll({
      include: [{
        model: _Ficheiros.default,
        as: "anexo"
      }, {
        model: _StatusDeVistos.default,
        as: "statusActual"
      }, {
        model: _Pedidos.default,
        as: "processo",
        include: [{
          model: _Requerentes.default,
          as: "requerente"
        }, {
          model: _TipoVistos.default,
          as: "tipoVisto"
        }]
      }]
    });
    return {
      total,
      vistos
    };
  }
  async validadeByNumero({
    numero
  }) {
    let isValid = await _Vistos.default.findOne({
      where: {
        numero
      }
    });
    if (!isValid) {
      return false;
    }
    return true;
  }
  async validadeById({
    id
  }) {
    let isValid = await _Vistos.default.findOne({
      where: {
        id
      }
    });
    if (!isValid) {
      return false;
    }
    return true;
  }
  async getByNumero({
    numero
  }) {
    const isValid = this.validadeByNumero({
      numero
    });
    if (!isValid) {
      return false;
    }
    const visto = await _Vistos.default.findOne({
      where: {
        numero
      },
      include: [{
        model: _Ficheiros.default,
        as: "anexo"
      }, {
        model: _Pedidos.default,
        as: "processo",
        include: [{
          model: _Requerentes.default,
          as: "requerente"
        }, {
          model: _TipoVistos.default,
          as: "tipoVisto"
        }]
      }]
    });
    return visto;
  }
  async getAllValiableDate() {
    const dataActual = new Date();
    const {
      count: total,
      rows: vistos
    } = await _Vistos.default.findAndCountAll({
      where: {
        dataValidade: {
          [_sequelize.Op.gt]: dataActual
        }
      },
      include: [{
        model: _Ficheiros.default,
        as: "anexo"
      }, {
        model: _Pedidos.default,
        as: "processo",
        include: [{
          model: _Requerentes.default,
          as: "requerente"
        }, {
          model: _TipoVistos.default,
          as: "tipoVisto"
        }]
      }]
    });
    return {
      total,
      vistos
    };
  }
  async validateIfDateIsExpired({
    numero
  }) {
    const isValid = await this.validadeByNumero({
      numero
    });
    if (!isValid) {
      throw new _apiErrors.NotFoundError("Numero de Visto Invalido");
    }
    const dataActual = new Date();
    const expired = await _Vistos.default.findOne({
      where: {
        dataValidade: {
          [_sequelize.Op.lte]: dataActual
        }
      }
    });
    if (!expired) {
      return false;
    }
    return true;
  }
  async getById({
    id
  }) {
    const isValid = this.validadeByNumero({
      id
    });
    if (!isValid) {
      return false;
    }
    const visto = await _Vistos.default.findOne({
      where: {
        id
      },
      include: [{
        model: _Ficheiros.default,
        as: "anexo"
      }, {
        model: _Pedidos.default,
        as: "processo",
        include: [{
          model: _Requerentes.default,
          as: "requerente"
        }, {
          model: _TipoVistos.default,
          as: "tipoVisto"
        }]
      }]
    });
    return visto;
  }
  async getAllUnvaliableDate() {
    const dataActual = new Date();
    const {
      count: total,
      rows: vistos
    } = await _Vistos.default.findAndCountAll({
      where: {
        dataValidade: {
          [_sequelize.Op.lte]: dataActual
        }
      },
      include: [{
        model: _Ficheiros.default,
        as: "anexo"
      }, {
        model: _Pedidos.default,
        as: "processo",
        include: [{
          model: _Requerentes.default,
          as: "requerente"
        }, {
          model: _TipoVistos.default,
          as: "tipoVisto"
        }]
      }]
    });
    return {
      total,
      vistos
    };
  }
}
var _default = exports.default = VistoRepository;