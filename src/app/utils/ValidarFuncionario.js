import Funcionario from "../models/Funcionario";


class ValidarFuncionario {
  async porId(id) {
    try {
      if (!id) return 0;

      const funcionarioExiste = await Funcionario.findOne({
        where: {
          id,
        },
      });

      if (!funcionarioExiste) {
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      return -1;
    }
  }
}
export default new ValidarFuncionario();
