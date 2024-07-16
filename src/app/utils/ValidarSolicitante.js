import Solicitante from "../models/Solicitante";

class ValidarSolicitante {
  async porId(id) {
    try {
      if (!id) return 0;

      const solicitanteExiste = await Solicitante.findOne({
        where: {
          id,
        },
      });

      if (!
        solicitanteExiste) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
  async porNumeroDoDocumentoDeViagem(numeroDocumentoViagem) {
    try {
      if (!nif) return 0;

      const solicitanteExiste = await Solicitante.findOne({
        where: {
          numeroDocumentoViagem
        },
      });

      if (!solicitanteExiste) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}

export default new ValidarSolicitante()
