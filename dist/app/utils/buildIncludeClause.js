"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function buildIncludeClause(includeParams, relationalModel) {
  const includeClause = [];
  if (Array.isArray(includeParams, relationalModel)) {
    includeParams.forEach(param => {
      if (param.association) {
        includeClause.push(param);
      } else if (param.model && param.as) {
        includeClause.push(param);
      } else if (typeof param === "string") {
        includeClause.push({
          model: relationalModel,
          as: param
        });
      }
    });
  }
  return includeClause;
}
var _default = exports.default = buildIncludeClause;