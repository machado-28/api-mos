import Funcionario from "../../models/Funcionario";

class FuncionarioMetodos {

    async listar() {

    }
    async listarPorDepartamento() {

    }
    async listarPorCargo() {

    }
    async detalharUm() {

    }
    async apagar() {

    }
    async actualizar() {

    }
    async validarPorId(id) {
        const funcionarioValido = await Funcionario.findByPk(id);

        if (!funcionarioValido) return false;

        return true;
    }
}

