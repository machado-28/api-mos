"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ClienteRepository = require("../../CustomRepositories/ClienteRepository");
var _ProcessoRepository = require("../../CustomRepositories/ProcessoRepository");
var _ProjectoRepository = require("../../CustomRepositories/ProjectoRepository");
var _TecnicoRepository = require("../../CustomRepositories/TecnicoRepository");
var _TipoDePedidoRepository = require("../../CustomRepositories/TipoDePedidoRepository");
var _TipoDeVistoRepository = require("../../CustomRepositories/TipoDeVistoRepository");
var _apiErrors = require("../../helpers/api-errors");
const pendente = 1;
class CreateProcessoUsecase {
  async execute({
    dataNascimento,
    genero,
    estadoCivil,
    nacionalidade,
    nomePai,
    nomeMae,
    maeNacionalidade,
    paiNacionalidade,
    vistoId,
    cidadeEndereco,
    passaporteNumero,
    passaporteEmissora,
    passaporteDataValidade,
    passaporteDataEmissao,
    mob,
    dataValidade,
    tipoVistoId,
    tipoId,
    projectoId,
    dataEmissao,
    sindicato,
    funcao,
    clienteId,
    beneficiarioId,
    paisNascimento
  }) {
    const processoRepository = new _ProcessoRepository.ProcessoRepository();
    const tecnicoRepository = new _TecnicoRepository.TecnicoRepository();
    const tipoVistoRepository = new _TipoDeVistoRepository.TipoDeVistoRepository();
    const clienteRepository = new _ClienteRepository.ClienteRepository();
    const projectoRepository = new _ProjectoRepository.ProjectoRepository();
    const tipoPedidoRepository = new _TipoDePedidoRepository.TipoDePedidoRepository();
    console.log("EXECUTE DATA", {
      dataNascimento,
      genero,
      estadoCivil,
      nacionalidade,
      nomePai,
      nomeMae,
      maeNacionalidade,
      paiNacionalidade,
      vistoId,
      cidadeEndereco,
      passaporteNumero,
      passaporteEmissora,
      passaporteDataValidade,
      passaporteDataEmissao,
      mob,
      dataValidade,
      tipoVistoId,
      tipoId,
      projectoId,
      dataEmissao,
      sindicato,
      funcao,
      clienteId,
      beneficiarioId,
      paisNascimento
    });
    const clienteExist = await clienteRepository.getById({
      id: clienteId
    });
    const beneficiarioIdExist = await tecnicoRepository.getById({
      id: beneficiarioId
    });
    const tipoVistoExist = await tipoVistoRepository.getById({
      id: tipoVistoId
    });
    const tipoPedidoExist = await tipoPedidoRepository.getById({
      id: tipoId
    });
    const projectoIdExist = await projectoRepository.getById({
      id: projectoId
    });
    if (!clienteExist) {
      throw new _apiErrors.NotFoundError("Id Cliente não foi encontrado!");
    }
    if (!beneficiarioIdExist) {
      throw new _apiErrors.NotFoundError("Id tecnico  não foi encontrado!");
    }
    if (!tipoVistoExist) {
      throw new _apiErrors.NotFoundError("Id tipo de visto  não foi encontrado!");
    }
    if (!projectoIdExist) {
      throw new _apiErrors.NotFoundError("Id projecto  não foi encontrado!");
    }
    if (!tipoPedidoExist) {
      throw new _apiErrors.NotFoundError("Id tipo pedido  não foi encontrado!");
    }
    const novoProcesso = await processoRepository.create({
      dataNascimento,
      genero,
      estadoCivil,
      nacionalidade,
      nomePai,
      nomeMae,
      maeNacionalidade,
      paiNacionalidade,
      vistoId,
      cidadeEndereco,
      passaporteNumero,
      passaporteEmissora,
      passaporteDataValidade,
      passaporteDataEmissao,
      mob,
      dataValidade,
      tipoVistoId,
      tipoId,
      projectoId,
      dataEmissao,
      sindicato,
      funcao,
      clienteId,
      beneficiarioId,
      paisNascimento
    });
    const {
      id
    } = novoProcesso;
    return novoProcesso;
  }
}
var _default = exports.default = new CreateProcessoUsecase();