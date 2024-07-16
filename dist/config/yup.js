"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _yup = require("yup");
var _default = exports.default = {
  setLocale: (0, _yup.setLocale)({
    mixed: {
      required: 'o campo ${path} é  obrigatorio',
      default: 'o campo ${path} é obrigatorio'
    },
    number: {
      min: ' o campo ${path} deve ser maior que ${min}',
      max: ' o campo ${path} deve ser menor que ${max}}',
      default: 'o campo ${path} deve ser do tipo numerico'
    },
    string: {
      email: 'o email inserido nao é valido',
      date: 'o campo ${path} espera receber uma data valida!',
      min: ' o campo ${path} deve conter no minimo ${min} caracteres',
      max: ' o campo ${path} deve conter no maximo ${min} caracteres'
    },
    date: {
      min: ' a data deve ser maior ou igual a ${min}'
    }
  })
};