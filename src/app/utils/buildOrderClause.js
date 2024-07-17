import { Op } from "sequelize";

function builOrderClause(ordersParams) {
    const orderClause = []

    if (Array.isArray(ordersParams)) {
        ordersParams.forEach(param => {
            const { orderBy, order } = param;

            // Validar a ordem (ASC ou DESC), padrão é ASC
            let validOrder = order && typeof order === "string" && (order.toUpperCase() === "ASC" || order.toUpperCase() === "DESC") ? order.toUpperCase() : "ASC";
            
            if ((order === undefined && "ASC") || (order === "undefined" && "ASC") || (order === null && "ASC") || (order === "null" && "ASC")) {
                validOrder = "DESC"
            }
            // Validar o campo orderBy, padrão é "nome"

            let validOrderBy = orderBy && typeof orderBy === "string" ? orderBy : "id";

            if ((orderBy === undefined && "id") || (orderBy === "undefined" && "id") || (orderBy === null && "id") || (orderBy === "null" && "id")) {
                validOrderBy = "id"

            }

            console.log("ORDERS", validOrder, validOrderBy);
            // Adicionar a cláusula de ordem ao array orderClause
            orderClause.push([validOrderBy, validOrder]);
        });
    } else {
        orderClause.push(["id", "ASC"]);
    }
    return orderClause
}
export default builOrderClause