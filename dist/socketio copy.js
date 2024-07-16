"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSocket = exports.sendMessage = void 0;
var _socket = _interopRequireDefault(require("socket.io"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let io;
const connetcions = [];
const setupSocket = server => {
  io = (0, _socket.default)(server, {
    cors: {
      origin: "http://localhost:3000"
    }
  });
  io.on("connection", socket => {
    console.log(socket.id);
    console.log(socket.handshake.query);
    const {
      nome,
      email,
      perfil
    } = socket.handshake.query;
    connetcions.push({
      id: socket.id,
      usuario: {
        nome,
        email,
        perfil
      }
    });
  });
};
exports.setupSocket = setupSocket;
const sendMessage = (msg, data = connetcions) => {
  io.emit(msg, data);
};
exports.sendMessage = sendMessage;