class TerminarSessaoController {
    async executar(req, res) {
        req.headers.authorization = null;
        return res.status(200).json({ message: true })
    }
}
export default new TerminarSessaoController();