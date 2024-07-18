import { Router } from "express";
import "dotenv/config";
import multerConfig from "./config/multer";
import multer from "multer";
import UploadController from "./app/controllers/UploadController";
import IniciarSessaoController from "../src/app/controllers/IniciarSessaoController"
import { ApiError } from "./app/helpers/api-errors";
import UsuarioController from "./app/controllers/Usuarios/UsuarioController";
import uploadAvatarController from "./app/controllers/Upload/uploadAvatarController";
import uploadDocumentoController from "./app/controllers/Upload/uploadDocumentoController";
import CreatePedidoDeEmissaoUseCase from "./app/Usecases/Pedidos/CreatePedidoDeEmissaoUseCase";
import ListDocumentoController from "./app/controllers/Documentos/ListDocumentoController";
import CreatePedidoEmissaoController from "./app/controllers/Pedidos/CreatePedidoEmissaoController";

const upload = multer(multerConfig);
const routes = new Router();

routes.get("/api/v1", async (req, res) => {
  return res.status(200).json({ message: "Metalica api" })
});

routes.post("/api/v1/upload/", upload.single("anexo"), uploadDocumentoController.stores);

routes.post("/api/v1/upload/avatar", upload.single("avatar"), uploadAvatarController.executar);
routes.post("/api/v1/sessao", IniciarSessaoController.executar);
routes.get("/api/v1/auth/perfils/:id", UsuarioController.detail);
routes.post("/api/v1/usuarios", UsuarioController.store);

routes.get("/api/v1/documentos/:numero", ListDocumentoController.getOne);

routes.post("/api/v1/pedido-emissao", CreatePedidoEmissaoController.store);

export default routes;
