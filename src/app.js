import 'express-async-errors';
import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "path";

import routes from "./routes";
import "./database";
import { ErrorMiddleware } from "./app/middleware/error";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionError()
  }

  middlewares() {

    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: "*",
        allowedHeaders: "*",
        exposedHeaders: [],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true
      },)
    );
    this.server.use("/ficheiros",
      express.static(path.resolve(__dirname, "..", "temp", "uploads")),)
    this.server.use("/public",
      express.static(path.resolve(__dirname, "..", "public")),)
  }

  routes() {
    this.server.use(routes);

  }
  exceptionError() {
    this.server.use(ErrorMiddleware)
  }
}
export default new App().server;
