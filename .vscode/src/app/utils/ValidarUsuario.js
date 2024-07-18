import Usuario from "../models/Usuario";

class ValidarUsuario {
  async porId(id) {
    try {
      if (!id) return 0;

      const funcionarioExiste = await Usuario.findOne({
        where: {
          id,
        },
      });

      if (!usuarioExiste) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
  async porNif(nif) {
    try {
      if (!nif) return 0;

      const usuarioExiste = await Usuario.findOne({
        where: {
          nif,
        },
      });

      if (!usuarioExiste) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export default new ValidarUsuario()
