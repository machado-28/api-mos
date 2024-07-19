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
import DelegarProcessoController from "./app/controllers/Processos/DelegarProcessoController.js";
import BucarStatusProcessoPorFaseController from "./app/controllers/Processos/BucarStatusProcessoPorFaseController.js";


const upload = multer(multerConfig);
const routes = new Router();

routes.get("/v1", async (req, res) => {
  return res.status(200).json({ message: "Metalica api" })
});
routes.post("/v1/sessao", IniciarSessaoController.executar);
routes.use(auth)
routes.post("/v1/upload/", upload.single("anexo"), uploadController.stores);

routes.post("/v1/upload/one", upload.single("anexo"), uploadController.storeOne);

routes.post("/v1/upload/avatar", upload.single("avatar"), uploadAvatarController.executar);

routes.get("/v1/auth/perfil", UsuarioController.detail);
routes.post("/v1/usuarios", UsuarioController.store);
routes.get("/v1/usuarios", UsuarioController.getAll);
routes.get("/v1/usuarios/count", UsuarioController.count);

routes.get("/v1/fazes", FazesController.getAll);
routes.get("/v1/status-de-pedido/:fazeId", FazesController.getStaus);

routes.get("/v1/pedidos/", ListPedidosController.getAll);
routes.get("/v1/pedidos/count", ListPedidosController.count);
routes.post("/v1/pedidos/", CreatePedidoController.store);
routes.get("/v1/pedidos", ListPedidosController.getOne);
routes.patch("/v1/pedidos/:id", UpdatePedidoController.execute);

routes.put("/v1/processo/:id", UpdateProcessoController.execute);
routes.get("/v1/processos/list", BucarStatusProcessoPorFaseController.execute);
routes.post("/v1/processos/:id/delegar", DelegarProcessoController.execute);
routes.post("/v1/processos", ProcessoController.store);
// routes.get("/v1/processos", ProcessoController.list);
routes.get("/v1/processos/progresso", ProcessoController.progresso);
routes.get("/v1/processos/mapa", ProcessoController.mapa);
routes.get("/v1/processos/ficha", ProcessoController.ficha);
routes.get("/v1/processos/count", ProcessoController.count);
routes.patch("/v1/processos/:id", ProcessoController.update);
routes.get("/v1/painels/", PainelController.list);



routes.post("/v1/gestores", GestoresController.store)
routes.get("/v1/gestores", GestoresController.list)
routes.put("/v1/gestores/:id", UsuarioController.update)
routes.delete("/v1/gestores/:id", UsuarioController.delete)
routes.get("/v1/gestores/count", GestoresController.count);


routes.post("/v1/tecnicos", TecnicosController.store);
routes.get("/v1/tecnicos", TecnicosController.list);
routes.put("/v1/tecnicos/:id", TecnicosController.update);
routes.get("/v1/tecnicos/count", TecnicosController.count);
routes.delete("/v1/tecnicos/:id", TecnicosController.delete);

routes.post("/v1/pdf/", CreatePDFController.createMapa);
routes.post("/v1/processo/sme/pdf", CreatePDFController.createSMEForm)
routes.post("/v1/visto", VistoController.create)
routes.get("/v1/vistos/expired", VistoController.getAllExpired)
routes.get("/v1/actived", VistoController.getAllActived)
routes.get("/v1/vistos", VistoController.getAll)
routes.put("/v1/vistos", VistoController.create)

routes.post("/v1/projectos", ProjectoController.create)
routes.put("/v1/projectos/:id", ProjectoController.update)
routes.delete("/v1/projectos/:id", ProjectoController.delete)
routes.get("/v1/projectos", ProjectoController.list)
routes.get("/v1/projectos/count", ProjectoController.count)
routes.get("/v1/projectos/:id", ProjectoController.getOne)
  ;
routes.post("/v1/clientes", ClienteController.create);
routes.get("/v1/clientes/count", ClienteController.count);
routes.get("/v1/clientes/:id", ClienteController.getOne);
routes.get("/v1/clientes/lista/pdf", ClienteController.ListaPdf);
routes.get("/v1/clientes/ficha/pdf", ClienteController.ficha);
routes.get("/v1/clientes", ClienteController.getAll);

export default routes;
