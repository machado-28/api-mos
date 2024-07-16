import ListStatusProcessoUsecase from "../../usecases/ListStatusProcessoUsecase";

class ListStatusProcessosController {
    async getAll(req, res) {

        const { status, total } = await ListStatusProcessoUsecase.execute();

        return res.status(200).json({ status, total });

    }
}

export default new ListStatusProcessosController();