import Aula_tipo from "../models/Aula_tipo";

const { response } = require("express");
const { default: api } = require("../../services/angola-api");

class ValidarTipo {
  async titulo(titulo) {
    const aula_tipoValida = await Aula_tipo.findOne({
      where: {
        titulo: titulo,
      },
    });
    console.log("Aula_tipo:", aula_tipoValida);
    s;
    if (!aula_tipoValida) return false;
    return true;
  }
  async id(id) {
    const aula_tipoValida = await Aula_tipo.findOne({
      where: {
        id: id,
      },
    });
    console.log("Aula_tipo:", aula_tipoValida);
    if (!aula_tipoValida) return false;
    return true;
  }
}

export default new ValidarTipo();
