import { Router } from "express";
import "dotenv/config";
import multerConfig from "./config/multer";
import multer from "multer";
import UploadController from "./app/controllers/UploadController";
import IniciarSessaoController from "../src/app/controllers/IniciarSessaoController"
import { ApiError } from "./app/helpers/api-errors";
import UsuarioController from "./app/controllers/Usuarios/UsuarioController";
import uploadAvatarController from "./app/controllers/Upload/uploadAvatarController";
import uploadController from "./app/controllers/Upload/uploadController.js";
import CreatePedidoDeEmissaoUseCase from "./app/Usecases/Pedidos/CreatePedidoUseCase.js";
import ListDocumentoController from "./app/controllers/Documentos/ListDocumentoController";
import CreatePedidoController from "./app/controllers/Pedidos/CreatePedidoController.js";
import ListPedidosController from "./app/controllers/Pedidos/ListPedidosController";
import FazesController from "./app/controllers/Pedidos/FazesController.js";
import UpdateProcessoController from "./app/controllers/Pedidos/UpdatePedidoController.js";
import GerarPDF from "./app/controllers/PDF/GerarPDF.js";
import VistoController from "./app/controllers/Visto/VistoController.js";
import auth from "./app/middleware/auth.js";
import ProjectoController from "./app/controllers/Projetos/ProjectoController.js";
import ClienteController from "./app/controllers/Clientes/ClienteController.js";
import UpdatePedidoController from "./app/controllers/Pedidos/UpdatePedidoController.js";
import CreatePDFController from "./app/controllers/PDF/CreatePDFController.js";
import GestoresController from "./app/controllers/Gestores/GestoresController.js";
import TecnicosController from "./app/controllers/Tecnicos/TecnicosController.js";
import ProcessoController from "./app/controllers/Processos/ProcessoController.js";
import PainelController from "./app/controllers/Painel/PainelController.js";


const upload = multer(multerConfig);
const routes = new Router();

routes.get("/api/v1", async (req, res) => {
  return res.status(200).json({ message: "Metalica api" })
});
routes.post("/api/v1/sessao", IniciarSessaoController.executar);
routes.use(auth)
routes.post("/api/v1/upload/", upload.single("anexo"), uploadController.stores);

routes.post("/api/v1/upload/one", upload.single("anexo"), uploadController.storeOne);

routes.post("/api/v1/upload/avatar", upload.single("avatar"), uploadAvatarController.executar);

routes.get("/api/v1/auth/perfil", UsuarioController.detail);
routes.post("/api/v1/usuarios", UsuarioController.store);
routes.get("/api/v1/usuarios", UsuarioController.getAll);
routes.get("/api/v1/usuarios/count", UsuarioController.count);

routes.get("/api/v1/fazes", FazesController.getAll);
routes.get("/api/v1/status-de-pedido/:fazeId", FazesController.getStaus);

routes.get("/api/v1/pedidos/", ListPedidosController.getAll);
routes.get("/api/v1/pedidos/count", ListPedidosController.count);
routes.post("/api/v1/pedidos/", CreatePedidoController.store);
routes.get("/api/v1/pedidos", ListPedidosController.getOne);
routes.patch("/api/v1/pedidos/:id", UpdatePedidoController.execute);

routes.put("/api/v1/processo/:id", UpdateProcessoController.execute);
routes.post("/api/v1/processos/", ProcessoController.store);
routes.get("/api/v1/processos/", ProcessoController.list);

routes.get("/api/v1/painels/", PainelController.list);



routes.post("/api/v1/gestores", GestoresController.store)
routes.get("/api/v1/gestores", GestoresController.list)
routes.put("/api/v1/gestores/:id", UsuarioController.update)
routes.delete("/api/v1/gestores/:id", UsuarioController.delete)
routes.get("/api/v1/gestores/count", GestoresController.count);


routes.post("/api/v1/tecnicos", TecnicosController.store);
routes.get("/api/v1/tecnicos", TecnicosController.list);
routes.put("/api/v1/tecnicos/:id", TecnicosController.update);
routes.get("/api/v1/tecnicos/count", TecnicosController.count);
routes.delete("/api/v1/tecnicos/:id", TecnicosController.delete);

routes.post("/api/v1/pdf/", CreatePDFController.createMapa);
routes.post("/api/v1/processo/sme/pdf", CreatePDFController.createSMEForm)
routes.post("/api/v1/visto", VistoController.create)
routes.get("/api/v1/vistos/expired", VistoController.getAllExpired)
routes.get("/api/v1/actived", VistoController.getAllActived)
routes.get("/api/v1/vistos", VistoController.getAll)
routes.put("/api/v1/vistos", VistoController.create)

routes.post("/api/v1/projectos", ProjectoController.create)
routes.put("/api/v1/projectos/:id", ProjectoController.update)
routes.delete("/api/v1/projectos/:id", ProjectoController.delete)
routes.get("/api/v1/projectos", ProjectoController.list)
routes.get("/api/v1/projectos/count", ProjectoController.count)
routes.get("/api/v1/projectos/:id", ProjectoController.getOne)
  ;
routes.post("/api/v1/clientes", ClienteController.create);
routes.get("/api/v1/clientes/count", ClienteController.count);
routes.get("/api/v1/clientes/:id", ClienteController.getOne);

routes.get("/api/v1/clientes", ClienteController.getAll);

export default routes;
