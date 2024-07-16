function buildIncludeClause(includeParams,relationalModel) {
    const includeClause = [];

    if (Array.isArray(includeParams, relationalModel)) {
        includeParams.forEach(param => {
            if (param.association) {
                includeClause.push(param);
            }
            else if (param.model && param.as) {
                includeClause.push(param);
            } else if (typeof param === "string") {
                includeClause.push({
                    model: relationalModel, as: param
                });
            }
        })
    }
    return includeClause
}

export default buildIncludeClause