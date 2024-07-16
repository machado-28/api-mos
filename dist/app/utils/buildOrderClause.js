"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _sequelize = require("sequelize");
function builOrderClause(ordersParams) {
  const orderClause = [];
  if (Array.isArray(ordersParams)) {
    ordersParams.forEach(param => {
      const {
        orderBy,
        order
      } = param;

      // Validar a ordem (ASC ou DESC), padrão é ASC
      let validOrder = order && typeof order === "string" && (order.toUpperCase() === "ASC" || order.toUpperCase() === "DESC") ? order.toUpperCase() : "ASC";
      if (order === undefined && "ASC" || order === "undefined" && "ASC" || order === null && "ASC" || order === "null" && "ASC") {
        validOrder = "DESC";
      }
      // Validar o campo orderBy, padrão é "nome"

      let validOrderBy = orderBy && typeof orderBy === "string" ? orderBy : "nome";
      if (orderBy === undefined && "nome" || orderBy === "undefined" && "nome" || orderBy === null && "nome" || orderBy === "null" && "nome") {
        validOrderBy = "nome";
      }
      console.log("ORDERS", validOrder, validOrderBy);
      // Adicionar a cláusula de ordem ao array orderClause
      orderClause.push([validOrderBy, validOrder]);
    });
  } else {
    orderClause.push(["nome", "ASC"]);
  }
  return orderClause;
}
var _default = exports.default = builOrderClause;