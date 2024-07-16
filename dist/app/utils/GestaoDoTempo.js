"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
class GestaoDoTempo {
  padronizarHoraNaData(horaInserida) {
    let dataAcual = new Date();
    const {
      hora,
      minutos
    } = this.dividirHoraDoMinuto(horaInserida);
    let horaPadronizadaNaData = dataAcual.setMinutes(hora, minutos, 0, 0);
    return horaPadronizadaNaData;
  }
  dividirHoraDoMinuto(horaInserida) {
    horaInserida.toString();
    const [hora, minutos] = horaInserida.split(":");
    return {
      hora,
      minutos
    };
  }
  converterHoraEmMinutos(horaInserida) {
    const _1HORA_EM_MINUTOS = 60;
    const {
      hora,
      minutos
    } = this.dividirHoraDoMinuto(horaInserida);
    const horaConvertida = hora * _1HORA_EM_MINUTOS + Number(minutos);
    return horaConvertida;
  }
  calcularDiferençaEntreDuasHoras(horaFinal, horaInicial) {
    let horaFinalEmMinutos = this.converterHoraEmMinutos(horaFinal);
    let horaInicialEmMinutos = this.converterHoraEmMinutos(horaInicial);
    let diferençaEntreAsHorasEmMinutos = horaFinalEmMinutos - horaInicialEmMinutos;
    return diferençaEntreAsHorasEmMinutos;
  }
  calcularDiferençaEntreDuasDatas(dataInicial, dataFinal) {}
}
var _default = exports.default = new GestaoDoTempo();