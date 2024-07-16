"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class permissaoAcesso {
  async isAdmin(req, res, next) {
    const {
      perfil
    } = req.sessao;
    const administrador = "administrador";
    if (perfil !== administrador) {
      return res.status(401).json({
        status: 401,
        code: 401,
        erro: "acção administrativa!"
      });
    }
    return next();
  }
  async isProgramador(req, res, next) {
    const {
      perfil
    } = req.sessao;
    console.log(perfil);
    const programador = "programador";
    if (perfil !== programador) {
      return res.status(401).json({
        status: 401,
        code: 401,
        erro: "somente para programador!"
      });
    }
    return next();
  }
  async isInstrutor(req, res, next) {
    const {
      perfil
    } = req.sessao;
    const administrador = "administrador";
    const instructor = "instructor";
    console.log(perfil);
    if (perfil != instructor) {
      return res.status(401).json({
        status: 401,
        code: 401,
        erro: "somente para instrutores!"
      });
    }
    return next();
  }
  async isAluno(req, res, next) {
    const {
      perfil
    } = req.sessao;
    const aluno = "aluno";
    if (perfil !== aluno) {
      return res.status(401).json({
        status: 401,
        code: 401,
        erro: "somente para alunos!"
      });
    }
    return next();
  }
}
var _default = exports.default = new permissaoAcesso();