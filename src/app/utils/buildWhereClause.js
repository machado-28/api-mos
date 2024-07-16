import { endOfHour, startOfDay, startOfHour } from "date-fns";
import { Op } from "sequelize";

function buildWhereClause(filters) {

    let whereClausule = {};
    if (filters?.startDate != "undefined" && filters?.startDate != "null" && filters?.startDate != undefined && filters?.startDate != null) {
        whereClausule.createdAt = {
            [Op.gte]: filters?.startDate
        }
    }

    if (filters?.endDate != "undefined" && filters?.endDate != "null" && filters?.endDate != undefined && filters?.endDate != null) {
        if (!whereClausule.createdAt)
            whereClausule.createdAt = {}

        whereClausule.createdAt = {
            [Op.lte]: filters?.endDate
        }
    }
    
    if (filters?.date != "undefined" && filters?.date != "null" && filters?.date != undefined && filters?.date != null) {
        if (!whereClausule.createdAt)
            whereClausule.createdAt = {};
        const startOfDate = startOfHour(new Date(filters.date));
        const endOfDate = endOfHour(new Date(filters?.date));
        endOfDate.setDate(endOfDate.getDate() + 1);
        whereClausule.createdAt = {
            [Op.gte]: startOfDate,
            [Op.lt]: endOfDate
        }
    }

    if (filters?.expired != "undefined" && filters?.expired != "null" && filters?.expired != undefined && filters?.expired != null) {
        let dataActual = new Date()
        whereClausule.dataValidade = {
            [Op.lt]: dataActual
        }

    }
    if (filters?.statusId != "undefined" && filters?.statusId != "null" && filters?.statusId != undefined && filters?.statusId != null) {

        whereClausule.statusId = {
            [Op.eq]: filters?.statusId
        }

    }
    if (filters?.fazeId != "undefined" && filters?.fazeId != "null" && filters?.fazeId != undefined && filters?.fazeId != null) {

        whereClausule.fazeId = {
            [Op.eq]: filters?.fazeId
        }

    }
    if (filters?.id != "undefined" && filters?.id != "null" && filters?.id != undefined && filters?.id != null) {

        whereClausule.id = {
            [Op.eq]: filters?.id
        }

    }
    if (filters?.stepId != "undefined" && filters?.stepId != "null" && filters?.stepId != undefined && filters?.stepId != null) {

        whereClausule.stepId = {
            [Op.eq]: filters?.stepId
        }
    }
    if (filters?.beneficiarioId != "undefined" && filters?.beneficiarioId != "null" && filters?.beneficiarioId != undefined && filters?.beneficiarioId != null) {

        whereClausule.beneficiarioId = {
            [Op.eq]: filters?.beneficiarioId
        }

}
    if (filters?.gestorExternoId != "undefined" && filters?.gestorExternoId != "null" && filters?.gestorExternoId != undefined && filters?.gestorExternoId != null) {

        whereClausule[Op.or] =
            [{ gestorExternoId: filters?.gestorExternoId }, { gestorInternoId: filters?.gestorExternoId }]


    }
    if (filters?.gestorInternoId != "undefined" && filters?.gestorInternoId != "null" && filters?.gestorInternoId != undefined && filters?.gestorInternoId != null) {

        whereClausule[Op.or] =
            [{ gestorExternoId: filters?.gestorInternoId }, { gestorInternoId: filters?.gestorInternoId }]


    }
    if (filters?.gestorInternoId != "undefined" && filters?.gestorInternoId != "null" && filters?.gestorInternoId != undefined && filters?.gestorInternoId != null) {

        whereClausule = {
            [Op.or]: [{ gestorExternoId: filters?.gestorInternoId }, { gestorInternoId: filters?.gestorInternoId }, { gestorExternoId: filters?.gestorInternoId }, { gestorInternoId: filters?.gestorInternoId }]
        }

    }


    if (filters?.nome != "undefined" && filters?.startDate != "null" && filters?.nome != undefined && filters?.startDate != null) {
        whereClausule.nome = {
            [Op.like]: `%${filters?.nome}%`
        }
    }

    if (filters?.clienteId != "undefined" && filters?.clienteId != "null" && filters?.clienteId != undefined && filters?.clienteId != null) {
        whereClausule.clienteId = {
            [Op.eq]: filters?.clienteId
        }
    }

    if (filters?.painelId != "undefined" && filters?.painelId != "null" && filters?.painelId != undefined && filters?.painelId != null) {
        whereClausule.painelId = {
            [Op.eq]: filters?.painelId
        }
    }

    if (filters?.usuarioId != "undefined" && filters?.usuarioId != "null" && filters?.usuarioId != undefined && filters?.usuarioId != null) {
        whereClausule.usuarioId = {
            [Op.eq]: filters?.usuarioId
        }
    }
    if (filters?.projectoId != "undefined" && filters?.projectoId != "null" && filters?.projectoId != undefined && filters?.projectoId != null) {
        whereClausule.projectoId = {
            [Op.eq]: filters?.projectoId
        }
    }
    if (filters?.gestorExternoId != "undefined" && filters?.gestorExternoId != "null" && filters?.gestorExternoId != undefined && filters?.gestorExternoId != null) {
        whereClausule.gestorExternoId = {
            [Op.eq]: filters?.gestorExternoId
        }
    }
    if (filters?.gestorIntenoId != "undefined" && filters?.gestorIntenoId != "null" && filters?.gestorIntenoId != undefined && filters?.gestorIntenoId != null) {
        whereClausule.gestorIntenoId = {
            [Op.eq]: filters?.gestorIntenoId
        }
    }
    if (filters?.vistoId != "undefined" && filters?.vistoId != "null" && filters?.vistoId != undefined && filters?.vistoId != null) {
        whereClausule.vistoId = {
            [Op.eq]: filters?.vistoId
        }
    }



    return whereClausule
}
export default buildWhereClause