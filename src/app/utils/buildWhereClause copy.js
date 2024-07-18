import { endOfHour, endOfMonth, startOfDay, startOfHour, startOfMonth } from "date-fns";
import { Op } from "sequelize";

function buildWhereClause(filters) {

    let whereClause = {};
    if (filters?.startDate != "undefined" && filters?.startDate != "null" && filters?.startDate != undefined && filters?.startDate != null) {
        whereClause.createdAt = {
            [Op.gte]: filters?.startDate
        }
    }
    if (filters.month && filters.year) {
        const startOfMonthDate = startOfMonth(new Date(filters.year, filters.month - 1)); // Meses em JavaScript são 0-indexados
        const endOfMonthDate = endOfMonth(new Date(filters.year, filters.month - 1));

        whereClause.createdAt = {
            [Op.gte]: startOfMonthDate,
            [Op.lte]: endOfMonthDate
        };
    }
    if (filters?.endDate != "undefined" && filters?.endDate != "null" && filters?.endDate != undefined && filters?.endDate != null) {
        if (!whereClause.createdAt)
            whereClause.createdAt = {}

        whereClause.createdAt = {
            [Op.lte]: filters?.endDate
        }
    }
    if (filters?.month && filters?.year) {
        const startOfMonthDate = startOfMonth(new Date(filters.year, filters.month - 1)); // Meses em JavaScript são 0-indexados
        const endOfMonthDate = endOfMonth(new Date(filters.year, filters.month - 1));

        whereClause.createdAt = {
            [Op.gte]: startOfMonthDate,
            [Op.lte]: endOfMonthDate
        }
    }

    if (filters?.date != "undefined" && filters?.date != "null" && filters?.date != undefined && filters?.date != null) {
        if (!whereClause.createdAt)
            whereClause.createdAt = {};
        const startOfDate = startOfHour(new Date(filters.date));
        const endOfDate = endOfHour(new Date(filters?.date));
        endOfDate.setDate(endOfDate.getDate() + 1);
        whereClause.createdAt = {
            [Op.gte]: startOfDate,
            [Op.lt]: endOfDate
        }
    }

    if (filters?.expired != "undefined" && filters?.expired != "null" && filters?.expired != undefined && filters?.expired != null) {
        let dataActual = new Date()
        whereClause.dataValidade = {
            [Op.lt]: dataActual
        }

    }
    if (filters?.statusId != "undefined" && filters?.statusId != "null" && filters?.statusId != undefined && filters?.statusId != null) {

        whereClause.statusId = {
            [Op.eq]: filters?.statusId
        }

    }
    if (filters?.tipoVistoId != "undefined" && filters?.tipoVistoId != "null" && filters?.tipoVistoId != undefined && filters?.tipoVistoId != null) {
        whereClause.tipoVistoId = {
            [Op.eq]: filters?.tipoVistoId
        }

    }
    if (filters?.fazeId != "undefined" && filters?.fazeId != "null" && filters?.fazeId != undefined && filters?.fazeId != null) {

        whereClause.fazeId = {
            [Op.eq]: filters?.fazeId
        }

    }
    if (filters?.id != "undefined" && filters?.id != "null" && filters?.id != undefined && filters?.id != null) {

        whereClause.id = {
            [Op.eq]: filters?.id
        }

    }
    if (filters?.stepId != "undefined" && filters?.stepId != "null" && filters?.stepId != undefined && filters?.stepId != null) {

        whereClause.stepId = {
            [Op.eq]: filters?.stepId
        }
    }
    if (filters?.beneficiarioId != "undefined" && filters?.beneficiarioId != "null" && filters?.beneficiarioId != undefined && filters?.beneficiarioId != null) {

        whereClause.beneficiarioId = {
            [Op.eq]: filters?.beneficiarioId
        }

    }
    if (filters?.gestorExternoId != "undefined" && filters?.gestorExternoId != "null" && filters?.gestorExternoId != undefined && filters?.gestorExternoId != null) {

        whereClause[Op.or] =
            [{ gestorExternoId: filters?.gestorExternoId }, { gestorInternoId: filters?.gestorExternoId }]


    }
    if (filters?.gestorInternoId != "undefined" && filters?.gestorInternoId != "null" && filters?.gestorInternoId != undefined && filters?.gestorInternoId != null) {

        whereClause[Op.or] =
            [{ gestorExternoId: filters?.gestorInternoId }, { gestorInternoId: filters?.gestorInternoId }]


    }
    if (filters?.gestorInternoId != "undefined" && filters?.gestorInternoId != "null" && filters?.gestorInternoId != undefined && filters?.gestorInternoId != null) {

        whereClause = {
            [Op.or]: [{ gestorExternoId: filters?.gestorInternoId }, { gestorInternoId: filters?.gestorInternoId }, { gestorExternoId: filters?.gestorInternoId }, { gestorInternoId: filters?.gestorInternoId }]
        }

    }


    if (filters?.nome != "undefined" && filters?.startDate != "null" && filters?.nome != undefined && filters?.startDate != null) {
        whereClause.nome = {
            [Op.like]: `%${filters?.nome}%`
        }
    }

    if (filters?.clienteId != "undefined" && filters?.clienteId != "null" && filters?.clienteId != undefined && filters?.clienteId != null) {
        whereClause.clienteId = {
            [Op.eq]: filters?.clienteId
        }
    }

    if (filters?.painelId != "undefined" && filters?.painelId != "null" && filters?.painelId != undefined && filters?.painelId != null) {
        whereClause.painelId = {
            [Op.eq]: filters?.painelId
        }
    }

    if (filters?.usuarioId != "undefined" && filters?.usuarioId != "null" && filters?.usuarioId != undefined && filters?.usuarioId != null) {
        whereClause.usuarioId = {
            [Op.eq]: filters?.usuarioId
        }
    }
    if (filters?.projectoId != "undefined" && filters?.projectoId != "null" && filters?.projectoId != undefined && filters?.projectoId != null) {
        whereClause.projectoId = {
            [Op.eq]: filters?.projectoId
        }
    }
    if (filters?.gestorExternoId != "undefined" && filters?.gestorExternoId != "null" && filters?.gestorExternoId != undefined && filters?.gestorExternoId != null) {
        whereClause.gestorExternoId = {
            [Op.eq]: filters?.gestorExternoId
        }
    }
    if (filters?.gestorIntenoId != "undefined" && filters?.gestorIntenoId != "null" && filters?.gestorIntenoId != undefined && filters?.gestorIntenoId != null) {
        whereClause.gestorIntenoId = {
            [Op.eq]: filters?.gestorIntenoId
        }
    }
    if (filters?.vistoId != "undefined" && filters?.vistoId != "null" && filters?.vistoId != undefined && filters?.vistoId != null) {
        whereClause.vistoId = {
            [Op.eq]: filters?.vistoId
        }
    }



    return whereClause
}
export default buildWhereClause