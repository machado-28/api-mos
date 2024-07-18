import Contacto from "../models/Contacto";

class ValidarContacto {
  async match(contacto) {
    try {
      const constactovalido = await Contacto.findOne({
        where: {
          descricao: contacto,
        },
      });

      if (!constactovalido) return false;
      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export default new ValidarContacto();
