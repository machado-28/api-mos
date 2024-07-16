"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function builAttributesClause(attributes) {
  const attribute = attributes?.length === 0 ? undefined : attributes;
  console.log(attribute);
  return attribute;
}
var _default = exports.default = builAttributesClause;