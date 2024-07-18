export const ErrorMiddleware = (error, req, res, next) => {

    console.log(error);
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Erro Interno!"
    return res.status(statusCode).json({ message, statusCode })
}