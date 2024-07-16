import VistoRepository from "../../CustomRepositories/VistoRepository"

export async function relatorioDiario({ tipoId, projetoId, dia = new Date().getDay() }) {
    const vistoRepository = new VistoRepository()
    const vistos = await VistoRepository?.getAllByDay({ tipoId, projetoId, dia });
    return vistos
}
export async function relatorioSemanal({ tipoId, projetoId, semana }) {
    const vistoRepository = new VistoRepository()
    const vistos = await VistoRepository?.getAllByWeek({ tipoId, projetoId });
    return vistos
}
export async function relatorioMensal({ tipoId, projetoId, mes }) {
    const VistoRepository = new VistoRepository()
    const vistos = await VistoRepository?.getAllByMonth({ tipoId, projetoId, mes });
    return vistos
}


