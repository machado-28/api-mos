"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _VistoRepository = _interopRequireDefault(require("./../../CustomRepositories/VistoRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RelatorioController {
  async relatorio(req, res) {
    const filtro = req.query;
    const {
      tipoId
    } = req.params;
    switch (filtro) {
      case "diario":
        async () => {
          const vistoRepository = new _VistoRepository.default();
          const vistos = await vistoRepository.getAllByDay({
            tipoId
          });
        };
        break;
      case "semanal":
        break;
      case "mensal":
        break;
      default:
        break;
    }
  }
  async gerarPdf(req, res) {}
}
var _default = exports.default = new RelatorioController();