import Usuario from "../models/Usuario";

async function CadastrarUsuario(
  nome,
  dataNascimento,
  isAdmin,
  genero,
  estadoCivil
) {
  try {
    const usuario = await Usuario.create({
      nome,
      dataNascimento,
      isAdmin,
      genero,
      estadoCivil,
    });

    return usuario;
  } catch (error) {
    console.log(error);
    return {};
  }
}
export default CadastrarUsuario;
